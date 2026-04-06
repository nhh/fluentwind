/**
 * Ant Design-style Admin Panel Demo
 * Most popular patterns: Page header, Breadcrumbs, Statistics cards,
 * Table with filters, Descriptions list, Steps/wizard, Tree navigation,
 * Notification list, Tag management
 */
import { useState } from 'react';
import {
  Button,
  Text,
  Input,
  Badge,
  Card,
  Avatar,
  Divider,
  Tablist,
  Tab,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Checkbox,
  Switch,
  ProgressBar,
  Searchbox,
  Label,
  Select,
  Nav,
  NavItem,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentwind/react';

/* ── Statistics Cards ── */
function StatCard({ title, value, suffix, trend, trendValue }: {
  title: string; value: string; suffix?: string; trend: 'up' | 'down'; trendValue: string;
}) {
  return (
    <Card appearance="filled" className="p-l flex-1 min-w-[180px]">
      <Text variant="caption1" className="text-neutral-foreground-3 mb-xs block">{title}</Text>
      <div className="flex items-baseline gap-xs">
        <Text variant="title2">{value}</Text>
        {suffix && <Text variant="caption1" className="text-neutral-foreground-3">{suffix}</Text>}
      </div>
      <div className="flex items-center gap-xxs mt-xs">
        <span className={trend === 'up' ? 'text-status-success-foreground-1' : 'text-status-danger-foreground-1'}>
          {trend === 'up' ? '↑' : '↓'} {trendValue}
        </span>
        <Text variant="caption2" className="text-neutral-foreground-4">vs last week</Text>
      </div>
    </Card>
  );
}

/* ── User Table ── */
function UserTable() {
  const [filter, setFilter] = useState('all');
  const users = [
    { id: 1, name: 'John Brown', age: 32, role: 'Admin', dept: 'Engineering', status: 'active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jim Green', age: 42, role: 'Editor', dept: 'Marketing', status: 'active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Joe Black', age: 28, role: 'Viewer', dept: 'Design', status: 'inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'Jane White', age: 35, role: 'Admin', dept: 'Engineering', status: 'active', lastLogin: '2024-01-15' },
    { id: 5, name: 'Jack Red', age: 45, role: 'Editor', dept: 'Sales', status: 'locked', lastLogin: '2024-01-01' },
  ];

  const filtered = filter === 'all' ? users : users.filter(u => u.status === filter);
  const statusBadge = (s: string) => {
    const map: Record<string, { color: 'success' | 'danger' | 'warning'; label: string }> = {
      active: { color: 'success', label: 'Active' },
      inactive: { color: 'danger', label: 'Inactive' },
      locked: { color: 'warning', label: 'Locked' },
    };
    const { color, label } = map[s] || { color: 'brand' as const, label: s };
    return <Badge appearance="tint" color={color} size="small">{label}</Badge>;
  };
  const roleBadge = (r: string) => {
    const colors: Record<string, string> = { Admin: 'bg-brand-background-2 text-brand-foreground-1', Editor: 'bg-status-warning-background-1 text-status-warning-foreground-1', Viewer: 'bg-neutral-background-4 text-neutral-foreground-2' };
    return <Tag size="small" className={colors[r] || ''}>{r}</Tag>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-m">
        <div className="flex gap-s">
          {['all', 'active', 'inactive', 'locked'].map(f => (
            <Button key={f} size="small" appearance={filter === f ? 'primary' : 'outline'} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all' && <Badge appearance="tint" color="brand" size="small" className="ml-xs">{users.length}</Badge>}
            </Button>
          ))}
        </div>
        <Searchbox placeholder="Search users..." size="small" className="w-52" />
      </div>

      <div className="border border-neutral-stroke-1 rounded-xlarge overflow-hidden">
        <table className="w-full text-300">
          <thead>
            <tr className="bg-neutral-background-3 border-b border-neutral-stroke-2">
              <th className="p-m text-start font-semibold">#</th>
              <th className="p-m text-start font-semibold">Name</th>
              <th className="p-m text-start font-semibold">Role</th>
              <th className="p-m text-start font-semibold">Department</th>
              <th className="p-m text-start font-semibold">Status</th>
              <th className="p-m text-start font-semibold">Last Login</th>
              <th className="p-m text-end font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-b border-neutral-stroke-3 hover:bg-subtle-background-hover transition-colors">
                <td className="p-m text-neutral-foreground-3">{u.id}</td>
                <td className="p-m">
                  <div className="flex items-center gap-s">
                    <Avatar name={u.name} size={28} />
                    <div>
                      <Text variant="body1Strong" block>{u.name}</Text>
                      <Text variant="caption2" className="text-neutral-foreground-4">Age {u.age}</Text>
                    </div>
                  </div>
                </td>
                <td className="p-m">{roleBadge(u.role)}</td>
                <td className="p-m text-neutral-foreground-2">{u.dept}</td>
                <td className="p-m">{statusBadge(u.status)}</td>
                <td className="p-m text-neutral-foreground-3">{u.lastLogin}</td>
                <td className="p-m text-end">
                  <Button size="small" appearance="subtle">Edit</Button>
                  <Button size="small" appearance="subtle" className="text-status-danger-foreground-1">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Descriptions Panel ── */
function DescriptionsPanel() {
  const items = [
    ['Product Name', 'Cloud Hosting Service'],
    ['Billing Mode', 'Prepaid'],
    ['Automatic Renewal', 'YES'],
    ['Order Time', '2024-01-15 12:00:00'],
    ['Usage Time', '2024-01-15 — 2025-01-15'],
    ['Status', 'Running'],
    ['Negotiated Amount', '$120.00'],
    ['Discount', '$20.00'],
    ['Official Receipts', '$100.00'],
    ['Configuration Info', '4 CPU / 8GB RAM / 200GB SSD'],
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-stroke-1 rounded-xlarge overflow-hidden">
      {items.map(([label, value], i) => (
        <div key={i} className="flex border-b border-neutral-stroke-3 last:border-b-0">
          <div className="bg-neutral-background-3 px-l py-m min-w-[160px]">
            <Text variant="caption1" className="text-neutral-foreground-3">{label}</Text>
          </div>
          <div className="px-l py-m flex-1">
            <Text variant="body1">{value}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── System Settings ── */
function SystemSettings() {
  return (
    <Accordion multiple>
      <AccordionItem value="general">
        <AccordionHeader>General Settings</AccordionHeader>
        <AccordionPanel>
          <div className="space-y-m py-m">
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body1Strong" block>Site Name</Text>
                <Text variant="caption1" className="text-neutral-foreground-3">The display name of your application</Text>
              </div>
              <Input defaultValue="Admin Panel" size="small" className="w-48" />
            </div>
            <Divider />
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body1Strong" block>Maintenance Mode</Text>
                <Text variant="caption1" className="text-neutral-foreground-3">Temporarily disable public access</Text>
              </div>
              <Switch />
            </div>
            <Divider />
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body1Strong" block>Language</Text>
                <Text variant="caption1" className="text-neutral-foreground-3">Default interface language</Text>
              </div>
              <Select size="small" className="w-36">
                <option>English</option>
                <option>German</option>
                <option>Chinese</option>
                <option>Japanese</option>
              </Select>
            </div>
          </div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionHeader>Security Settings</AccordionHeader>
        <AccordionPanel>
          <div className="space-y-m py-m">
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body1Strong" block>Two-Factor Authentication</Text>
                <Text variant="caption1" className="text-neutral-foreground-3">Require 2FA for all admin accounts</Text>
              </div>
              <Switch defaultChecked />
            </div>
            <Divider />
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body1Strong" block>Session Timeout</Text>
                <Text variant="caption1" className="text-neutral-foreground-3">Auto-logout after inactivity</Text>
              </div>
              <Select size="small" className="w-36">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
              </Select>
            </div>
            <Divider />
            <div>
              <Text variant="body1Strong" block className="mb-xs">Password Policy</Text>
              <div className="space-y-xs">
                <Checkbox label="Require uppercase letter" defaultChecked />
                <Checkbox label="Require number" defaultChecked />
                <Checkbox label="Require special character" />
                <Checkbox label="Minimum 12 characters" />
              </div>
            </div>
          </div>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="notifications">
        <AccordionHeader>Notification Settings</AccordionHeader>
        <AccordionPanel>
          <div className="space-y-m py-m">
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body1Strong" block>Email Notifications</Text>
                <Text variant="caption1" className="text-neutral-foreground-3">Receive important updates via email</Text>
              </div>
              <Switch defaultChecked />
            </div>
            <Divider />
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body1Strong" block>Browser Notifications</Text>
                <Text variant="caption1" className="text-neutral-foreground-3">Show desktop push notifications</Text>
              </div>
              <Switch />
            </div>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

/* ── Main Admin Panel ── */
export default function AntAdminPanel() {
  const [page, setPage] = useState('dashboard');

  return (
    <div className="flex gap-l min-h-[600px]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0">
        <div className="flex items-center gap-s mb-l">
          <div className="w-8 h-8 bg-brand-background rounded-medium flex items-center justify-center">
            <Text variant="body1Strong" className="text-neutral-foreground-on-brand">A</Text>
          </div>
          <Text variant="subtitle2">Admin Panel</Text>
        </div>
        <Nav size="medium">
          <NavItem value="dashboard" selected={page === 'dashboard'} onClick={() => setPage('dashboard')}
            icon={<span>📊</span>}>Dashboard</NavItem>
          <NavItem value="users" selected={page === 'users'} onClick={() => setPage('users')}
            icon={<span>👥</span>}>User Management</NavItem>
          <NavItem value="orders" selected={page === 'orders'} onClick={() => setPage('orders')}
            icon={<span>📦</span>}>Order Details</NavItem>
          <NavItem value="settings" selected={page === 'settings'} onClick={() => setPage('settings')}
            icon={<span>⚙️</span>}>System Settings</NavItem>
        </Nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Breadcrumb */}
        <Breadcrumb size="small" className="mb-m">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem current>{page.charAt(0).toUpperCase() + page.slice(1)}</BreadcrumbItem>
        </Breadcrumb>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-l">
          <Text variant="title2" as="h1">
            {page === 'dashboard' && 'Dashboard'}
            {page === 'users' && 'User Management'}
            {page === 'orders' && 'Order Details'}
            {page === 'settings' && 'System Settings'}
          </Text>
          {page === 'users' && (
            <Button appearance="primary">+ Add User</Button>
          )}
        </div>

        {page === 'dashboard' && (
          <div className="space-y-l">
            <MessageBar intent="info" shape="rounded">
              <MessageBarBody>
                <MessageBarTitle>System Update</MessageBarTitle>
                A new version (v2.4.0) is available. Please schedule an update during off-peak hours.
              </MessageBarBody>
            </MessageBar>

            <div className="flex gap-m flex-wrap">
              <StatCard title="Total Users" value="28,346" trend="up" trendValue="12%" />
              <StatCard title="Active Sessions" value="1,234" trend="up" trendValue="8%" />
              <StatCard title="Revenue" value="$84.5k" trend="down" trendValue="3%" />
              <StatCard title="Conversion Rate" value="3.24" suffix="%" trend="up" trendValue="0.5%" />
            </div>

            <div className="flex gap-l flex-wrap">
              <Card appearance="outline" className="flex-1 min-w-[300px] p-l">
                <Text variant="subtitle2" block className="mb-m">System Health</Text>
                <div className="space-y-m">
                  <div>
                    <div className="flex justify-between mb-xxs">
                      <Text variant="caption1">CPU Usage</Text>
                      <Text variant="caption1Strong">45%</Text>
                    </div>
                    <ProgressBar value={0.45} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-xxs">
                      <Text variant="caption1">Memory</Text>
                      <Text variant="caption1Strong">72%</Text>
                    </div>
                    <ProgressBar value={0.72} color="warning" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-xxs">
                      <Text variant="caption1">Disk</Text>
                      <Text variant="caption1Strong">89%</Text>
                    </div>
                    <ProgressBar value={0.89} color="error" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-xxs">
                      <Text variant="caption1">Network</Text>
                      <Text variant="caption1Strong">23%</Text>
                    </div>
                    <ProgressBar value={0.23} color="success" />
                  </div>
                </div>
              </Card>

              <Card appearance="outline" className="flex-1 min-w-[280px] p-l">
                <Text variant="subtitle2" block className="mb-m">Recent Notifications</Text>
                <div className="space-y-m">
                  {[
                    { title: 'New user registered', desc: 'jane.doe@email.com', time: '5m ago', type: 'info' },
                    { title: 'Payment received', desc: 'Order #12345 — $299.00', time: '1h ago', type: 'success' },
                    { title: 'Server warning', desc: 'High memory usage detected', time: '2h ago', type: 'warning' },
                    { title: 'Failed login attempt', desc: 'IP: 192.168.1.100', time: '3h ago', type: 'error' },
                  ].map((n, i) => (
                    <div key={i} className="flex items-start gap-s">
                      <Badge appearance="filled" size="extraSmall"
                        color={n.type === 'success' ? 'success' : n.type === 'warning' ? 'warning' : n.type === 'error' ? 'danger' : 'brand'} />
                      <div className="flex-1 min-w-0">
                        <Text variant="body1" block truncate>{n.title}</Text>
                        <Text variant="caption2" className="text-neutral-foreground-4" block truncate>{n.desc}</Text>
                      </div>
                      <Text variant="caption2" className="text-neutral-foreground-4 shrink-0">{n.time}</Text>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {page === 'users' && <UserTable />}
        {page === 'orders' && (
          <div className="space-y-l">
            <Card appearance="outline" className="p-l">
              <div className="flex items-center justify-between mb-m">
                <Text variant="subtitle2">Order #2024-0042</Text>
                <Badge appearance="tint" color="success" size="medium">Completed</Badge>
              </div>
              <DescriptionsPanel />
            </Card>
          </div>
        )}
        {page === 'settings' && <SystemSettings />}
      </main>
    </div>
  );
}
