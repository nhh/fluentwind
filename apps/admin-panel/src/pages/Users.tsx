import { useState } from 'react';
import {
  Card,
  Button,
  Searchbox,
  Select,
  Avatar,
  Badge,
  Tag,
  Persona,
  Pagination,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableSelectionCell,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  Input,
  Field,
  Text,
  Divider,
  Statistic,
} from '@fluentwind/react';
import { UserPlus, Pencil, Users as UsersIcon, UserCheck, Clock } from 'lucide-react';
import { users } from '../data/mock';
import type { User } from '../data/mock';

const statusColor: Record<string, 'success' | 'warning' | 'subtle'> = {
  Active: 'success',
  Inactive: 'subtle',
  Pending: 'warning',
};

const roleColor: Record<string, 'brand' | 'informative' | 'subtle'> = {
  Admin: 'brand',
  Editor: 'informative',
  Viewer: 'subtle',
};

const ITEMS_PER_PAGE = 5;

export default function Users() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const allSelected =
    paginatedUsers.length > 0 && paginatedUsers.every((u) => selectedIds.has(u.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedUsers.map((u) => u.id)));
    }
  };

  const toggleOne = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeCount = users.filter((u) => u.status === 'Active').length;
  const pendingCount = users.filter((u) => u.status === 'Pending').length;

  return (
    <div className="space-y-l">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-m">
        <Card className="p-l">
          <Statistic title="Total Users" value={users.length} size="medium" prefix={<UsersIcon size={18} className="text-brand-foreground-1" />} />
        </Card>
        <Card className="p-l">
          <Statistic title="Active" value={activeCount} size="medium" trend="up" trendValue="3" prefix={<UserCheck size={18} className="text-brand-foreground-1" />} />
        </Card>
        <Card className="p-l">
          <Statistic title="Pending Invites" value={pendingCount} size="medium" prefix={<Clock size={18} className="text-brand-foreground-1" />} />
        </Card>
      </div>

      {/* Main table card */}
      <Card className="p-l">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-m mb-m">
          <Searchbox
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            onDismiss={() => {
              setSearch('');
              setPage(1);
            }}
            size="medium"
            className="w-64"
          />
          <Select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </Select>
          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </Select>
          <div className="flex-1" />
          {selectedIds.size > 0 && (
            <Text className="text-200 text-neutral-foreground-3">
              {selectedIds.size} selected
            </Text>
          )}
          <Button
            appearance="primary"
            onClick={() => {
              setEditingUser(null);
              setDialogOpen(true);
            }}
          >
            <UserPlus size={16} className="mr-xs" /> Add User
          </Button>
        </div>

        {/* Table */}
        <Table size="small">
          <TableHeader>
            <TableRow>
              <TableSelectionCell
                checked={allSelected ? true : selectedIds.size > 0 ? 'mixed' : false}
                onChange={toggleAll}
              />
              <TableHeaderCell>User</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Last Login</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                appearance={selectedIds.has(user.id) ? 'brand' : 'none'}
              >
                <TableSelectionCell
                  checked={selectedIds.has(user.id)}
                  onChange={() => toggleOne(user.id)}
                />
                <TableCell>
                  <Persona
                    name={user.name}
                    avatar={<Avatar name={user.name} size={28} color="colorful" />}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <span className="text-neutral-foreground-2">{user.email}</span>
                </TableCell>
                <TableCell>
                  <Badge color={roleColor[user.role]} appearance="tint" size="small">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge color={statusColor[user.status]} appearance="filled" size="small">
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-200 text-neutral-foreground-3">{user.lastLogin}</span>
                </TableCell>
                <TableCell>
                  <Button
                    appearance="subtle"
                    size="small"
                    onClick={() => {
                      setEditingUser(user);
                      setDialogOpen(true);
                    }}
                  >
                    <Pencil size={14} className="mr-xxs" /> Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-m">
          <Text className="text-200 text-neutral-foreground-3">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(page * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length}
          </Text>
          <Pagination totalPages={totalPages} currentPage={page} onChange={setPage} size="small" />
        </div>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogSurface>
          <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogBody>
            <div className="space-y-m py-m">
              <Field label="Full Name">
                <Input
                  defaultValue={editingUser?.name ?? ''}
                  placeholder="Enter full name"
                />
              </Field>
              <Field label="Email">
                <Input
                  type="email"
                  defaultValue={editingUser?.email ?? ''}
                  placeholder="Enter email address"
                />
              </Field>
              <Field label="Role">
                <Select defaultValue={editingUser?.role ?? 'Viewer'}>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </Select>
              </Field>
            </div>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={() => setDialogOpen(false)}>
              {editingUser ? 'Save Changes' : 'Add User'}
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
