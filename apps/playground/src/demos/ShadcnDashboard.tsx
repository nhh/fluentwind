/**
 * Shadcn/ui-style Dashboard Demo
 * Most popular patterns: Cards with metrics, Data table, Command palette,
 * Form with validation, Sidebar navigation, Tabs, Badges, Avatars
 */
import { useState } from 'react';
import {
  Button,
  Text,
  Input,
  Badge,
  Card,
  Tablist,
  Tab,
  Avatar,
  Divider,
  Label,
  Select,
  Checkbox,
  Switch,
  ProgressBar,
  Searchbox,
} from '@fluentwind/react';

/* ── Metric Card ── */
function MetricCard({ title, value, change, trend }: {
  title: string; value: string; change: string; trend: 'up' | 'down';
}) {
  return (
    <Card appearance="outline" className="p-l flex-1 min-w-[200px]">
      <div className="flex justify-between items-start">
        <Text variant="caption1" className="text-neutral-foreground-3">{title}</Text>
        <svg className="text-neutral-foreground-3" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v12M4 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            transform={trend === 'down' ? 'rotate(180 8 8)' : ''} />
        </svg>
      </div>
      <Text variant="title1" className="mt-xs block">{value}</Text>
      <Text variant="caption1" className={trend === 'up' ? 'text-status-success-foreground-1' : 'text-status-danger-foreground-1'}>
        {change} from last month
      </Text>
    </Card>
  );
}

/* ── Recent Sales List ── */
function RecentSales() {
  const sales = [
    { name: 'Olivia Martin', email: 'olivia@email.com', amount: '+$1,999.00', avatar: 'OM' },
    { name: 'Jackson Lee', email: 'jackson@email.com', amount: '+$39.00', avatar: 'JL' },
    { name: 'Isabella Nguyen', email: 'isabella@email.com', amount: '+$299.00', avatar: 'IN' },
    { name: 'William Kim', email: 'will@email.com', amount: '+$99.00', avatar: 'WK' },
    { name: 'Sofia Davis', email: 'sofia@email.com', amount: '+$39.00', avatar: 'SD' },
  ];
  return (
    <div className="space-y-l">
      {sales.map((sale) => (
        <div key={sale.email} className="flex items-center gap-m">
          <Avatar name={sale.name} size={40} />
          <div className="flex-1 min-w-0">
            <Text variant="body1Strong" block truncate>{sale.name}</Text>
            <Text variant="caption1" className="text-neutral-foreground-3" block truncate>{sale.email}</Text>
          </div>
          <Text variant="body1Strong">{sale.amount}</Text>
        </div>
      ))}
    </div>
  );
}

/* ── Data Table ── */
function DataTable() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const data = [
    { id: '1', status: 'success', email: 'ken99@yahoo.com', amount: 316.00 },
    { id: '2', status: 'success', email: 'abe45@gmail.com', amount: 242.00 },
    { id: '3', status: 'processing', email: 'monserrat44@gmail.com', amount: 837.00 },
    { id: '4', status: 'success', email: 'silas22@gmail.com', amount: 874.00 },
    { id: '5', status: 'failed', email: 'carmella@hotmail.com', amount: 721.00 },
  ];

  const toggle = (id: string) => {
    setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const statusColor: Record<string, 'success' | 'brand' | 'danger'> = {
    success: 'success', processing: 'brand', failed: 'danger',
  };

  return (
    <div className="border border-neutral-stroke-1 rounded-xlarge overflow-hidden">
      <table className="w-full text-300">
        <thead>
          <tr className="border-b border-neutral-stroke-2 bg-neutral-background-3">
            <th className="p-m text-start font-semibold w-10">
              <Checkbox
                checked={selected.size === data.length}
                onChange={() => setSelected(selected.size === data.length ? new Set() : new Set(data.map(d => d.id)))}
              />
            </th>
            <th className="p-m text-start font-semibold">Status</th>
            <th className="p-m text-start font-semibold">Email</th>
            <th className="p-m text-end font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-neutral-stroke-3 hover:bg-subtle-background-hover transition-colors">
              <td className="p-m"><Checkbox checked={selected.has(row.id)} onChange={() => toggle(row.id)} /></td>
              <td className="p-m">
                <Badge appearance="tint" color={statusColor[row.status]} size="small">{row.status}</Badge>
              </td>
              <td className="p-m text-neutral-foreground-2">{row.email}</td>
              <td className="p-m text-end font-medium">${row.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between p-m bg-neutral-background-3">
        <Text variant="caption1" className="text-neutral-foreground-3">
          {selected.size} of {data.length} row(s) selected.
        </Text>
        <div className="flex gap-xs">
          <Button size="small" appearance="outline" disabled>Previous</Button>
          <Button size="small" appearance="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}

/* ── Settings Form ── */
function SettingsForm() {
  return (
    <div className="space-y-l max-w-lg">
      <div>
        <Label className="mb-xxs block" weight="semibold">Username</Label>
        <Input placeholder="shadcn" className="w-full" />
        <Text variant="caption1" className="text-neutral-foreground-3 mt-xxs block">
          This is your public display name.
        </Text>
      </div>
      <div>
        <Label className="mb-xxs block" weight="semibold">Email</Label>
        <Select className="w-full">
          <option>Select a verified email</option>
          <option>m@example.com</option>
          <option>m@google.com</option>
        </Select>
      </div>
      <div>
        <Label className="mb-xxs block" weight="semibold">Bio</Label>
        <Input placeholder="Tell us about yourself" className="w-full" />
        <Text variant="caption1" className="text-neutral-foreground-3 mt-xxs block">
          You can @mention other users and organizations.
        </Text>
      </div>
      <Divider />
      <div className="flex items-center justify-between">
        <div>
          <Text variant="body1Strong" block>Marketing emails</Text>
          <Text variant="caption1" className="text-neutral-foreground-3">Receive emails about new products.</Text>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Text variant="body1Strong" block>Security emails</Text>
          <Text variant="caption1" className="text-neutral-foreground-3">Receive emails about account activity.</Text>
        </div>
        <Switch defaultChecked />
      </div>
      <Button appearance="primary">Update profile</Button>
    </div>
  );
}

/* ── Main Dashboard ── */
export default function ShadcnDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-l">
      <div className="flex items-center justify-between">
        <Text variant="title2" as="h1">Dashboard</Text>
        <div className="flex gap-s items-center">
          <Searchbox placeholder="Search..." size="small" className="w-60" />
          <Avatar name="Admin User" size={32} />
        </div>
      </div>

      <Tablist selectedValue={activeTab} onTabSelect={setActiveTab} appearance="subtle">
        <Tab value="overview">Overview</Tab>
        <Tab value="analytics">Analytics</Tab>
        <Tab value="reports">Reports</Tab>
        <Tab value="settings">Settings</Tab>
      </Tablist>

      {activeTab === 'overview' && (
        <>
          {/* Metric Cards */}
          <div className="flex gap-l flex-wrap">
            <MetricCard title="Total Revenue" value="$45,231.89" change="+20.1%" trend="up" />
            <MetricCard title="Subscriptions" value="+2,350" change="+180.1%" trend="up" />
            <MetricCard title="Sales" value="+12,234" change="+19%" trend="up" />
            <MetricCard title="Active Now" value="+573" change="-2%" trend="down" />
          </div>

          {/* Charts area + Recent Sales */}
          <div className="flex gap-l flex-wrap">
            <Card appearance="outline" className="flex-[2] min-w-[300px] p-l">
              <Text variant="subtitle2" block>Overview</Text>
              <Text variant="caption1" className="text-neutral-foreground-3 mb-m block">
                Monthly revenue for the current year.
              </Text>
              {/* Simulated bar chart */}
              <div className="flex items-end gap-xs h-40">
                {[40, 25, 60, 35, 75, 50, 90, 65, 80, 55, 70, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-brand-background rounded-small transition-all duration-normal hover:opacity-80"
                    style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-xs">
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                  <Text key={m} variant="caption2" className="text-neutral-foreground-3 flex-1 text-center">{m}</Text>
                ))}
              </div>
            </Card>

            <Card appearance="outline" className="flex-1 min-w-[280px] p-l">
              <Text variant="subtitle2" block>Recent Sales</Text>
              <Text variant="caption1" className="text-neutral-foreground-3 mb-m block">
                You made 265 sales this month.
              </Text>
              <RecentSales />
            </Card>
          </div>
        </>
      )}

      {activeTab === 'analytics' && (
        <Card appearance="outline" className="p-l">
          <Text variant="subtitle2" block className="mb-m">Analytics</Text>
          <div className="space-y-m">
            <div>
              <div className="flex justify-between mb-xxs">
                <Text variant="caption1">Page Views</Text>
                <Text variant="caption1Strong">78%</Text>
              </div>
              <ProgressBar value={0.78} />
            </div>
            <div>
              <div className="flex justify-between mb-xxs">
                <Text variant="caption1">Bounce Rate</Text>
                <Text variant="caption1Strong">32%</Text>
              </div>
              <ProgressBar value={0.32} color="warning" />
            </div>
            <div>
              <div className="flex justify-between mb-xxs">
                <Text variant="caption1">Conversion</Text>
                <Text variant="caption1Strong">12%</Text>
              </div>
              <ProgressBar value={0.12} color="success" />
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'reports' && (
        <DataTable />
      )}

      {activeTab === 'settings' && (
        <Card appearance="outline" className="p-l">
          <Text variant="subtitle2" block className="mb-xs">Profile Settings</Text>
          <Text variant="caption1" className="text-neutral-foreground-3 mb-l block">
            Manage your account settings and preferences.
          </Text>
          <SettingsForm />
        </Card>
      )}
    </div>
  );
}
