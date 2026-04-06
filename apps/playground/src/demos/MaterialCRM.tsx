/**
 * Material UI-style CRM App Demo
 * Most popular patterns: App bar, Drawer navigation, FAB, Cards, Chips,
 * Data grid, Dialogs, Snackbars, Stepper
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
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  Tag,
  Spinner,
  Searchbox,
  Label,
  Select,
  Textarea,
  Switch,
  ProgressBar,
} from '@fluentwind/react';

/* ── App Bar ── */
function AppBar() {
  return (
    <header className="bg-brand-background text-neutral-foreground-on-brand px-l py-m flex items-center gap-m rounded-xlarge mb-l">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <Text variant="subtitle2" className="text-neutral-foreground-on-brand flex-1">CRM Dashboard</Text>
      <Searchbox placeholder="Search contacts..." size="small" className="w-60 bg-brand-background-hover rounded-medium" />
      <Badge appearance="filled" color="danger" size="small">3</Badge>
      <Avatar name="John Doe" size={32} color="neutral" />
    </header>
  );
}

/* ── Contact Card ── */
function ContactCard({ name, role, company, status, onEdit }: {
  name: string; role: string; company: string; status: string; onEdit: () => void;
}) {
  const statusColors: Record<string, 'success' | 'warning' | 'brand' | 'danger'> = {
    Active: 'success', Lead: 'brand', 'Follow-up': 'warning', Inactive: 'danger',
  };
  return (
    <Card appearance="filled" className="p-l hover:shadow-8 transition-shadow duration-normal">
      <div className="flex items-start gap-m">
        <Avatar name={name} size={48} color="brand" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-s">
            <Text variant="body1Strong" truncate>{name}</Text>
            <Tag appearance="filled" size="small"
              className={`bg-status-${statusColors[status]}-background-3 text-status-${statusColors[status]}-foreground-3`}>
              {status}
            </Tag>
          </div>
          <Text variant="caption1" className="text-neutral-foreground-3" block>{role}</Text>
          <Text variant="caption1" className="text-neutral-foreground-2" block>{company}</Text>
        </div>
        <Button appearance="subtle" size="small" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </Card>
  );
}

/* ── Pipeline Board ── */
function PipelineColumn({ title, count, color, items }: {
  title: string; count: number; color: string; items: { name: string; value: string; days: number }[];
}) {
  return (
    <div className="flex-1 min-w-[220px]">
      <div className="flex items-center gap-s mb-m">
        <div className={`w-3 h-3 rounded-circular ${color}`} />
        <Text variant="body1Strong">{title}</Text>
        <Badge appearance="tint" color="brand" size="small">{count}</Badge>
      </div>
      <div className="space-y-s">
        {items.map((item, i) => (
          <Card key={i} appearance="outline" className="p-m cursor-pointer hover:shadow-4 transition-shadow duration-fast">
            <Text variant="body1Strong" block truncate>{item.name}</Text>
            <div className="flex justify-between mt-xs">
              <Text variant="caption1" className="text-neutral-foreground-3">{item.value}</Text>
              <Text variant="caption2" className="text-neutral-foreground-4">{item.days}d ago</Text>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ── New Contact Dialog ── */
function NewContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogSurface>
        <DialogTitle>New Contact</DialogTitle>
        <DialogBody>
          <div className="space-y-m">
            <div className="flex gap-m">
              <div className="flex-1">
                <Label className="mb-xxs block">First Name</Label>
                <Input placeholder="John" className="w-full" />
              </div>
              <div className="flex-1">
                <Label className="mb-xxs block">Last Name</Label>
                <Input placeholder="Doe" className="w-full" />
              </div>
            </div>
            <div>
              <Label className="mb-xxs block">Email</Label>
              <Input type="email" placeholder="john@company.com" className="w-full" />
            </div>
            <div>
              <Label className="mb-xxs block">Company</Label>
              <Input placeholder="Acme Inc." className="w-full" />
            </div>
            <div>
              <Label className="mb-xxs block">Status</Label>
              <Select className="w-full">
                <option value="lead">Lead</option>
                <option value="active">Active</option>
                <option value="followup">Follow-up</option>
              </Select>
            </div>
            <div>
              <Label className="mb-xxs block">Notes</Label>
              <Textarea placeholder="Add notes..." rows={3} className="w-full" />
            </div>
          </div>
        </DialogBody>
        <DialogActions>
          <Button appearance="secondary" onClick={onClose}>Cancel</Button>
          <Button appearance="primary" onClick={onClose}>Create Contact</Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
}

/* ── Activity Feed ── */
function ActivityFeed() {
  const activities = [
    { user: 'Sarah Chen', action: 'closed deal with', target: 'Acme Corp', time: '2h ago', type: 'success' },
    { user: 'Mike Johnson', action: 'added note to', target: 'TechStart Inc', time: '4h ago', type: 'info' },
    { user: 'Emily Davis', action: 'moved to Follow-up:', target: 'Global Solutions', time: '6h ago', type: 'warning' },
    { user: 'Alex Turner', action: 'created contact:', target: 'David Wilson', time: '1d ago', type: 'info' },
  ];

  return (
    <div className="space-y-m">
      {activities.map((a, i) => (
        <div key={i} className="flex items-start gap-m">
          <Avatar name={a.user} size={32} />
          <div className="flex-1">
            <Text variant="body1">
              <Text variant="body1Strong" as="span">{a.user}</Text>
              {' '}{a.action}{' '}
              <Text variant="body1Strong" as="span">{a.target}</Text>
            </Text>
            <Text variant="caption2" className="text-neutral-foreground-4" block>{a.time}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main CRM ── */
export default function MaterialCRM() {
  const [activeTab, setActiveTab] = useState('contacts');
  const [dialogOpen, setDialogOpen] = useState(false);

  const contacts = [
    { name: 'Sarah Chen', role: 'VP of Sales', company: 'Acme Corp', status: 'Active' },
    { name: 'Mike Johnson', role: 'CTO', company: 'TechStart Inc', status: 'Lead' },
    { name: 'Emily Davis', role: 'Product Manager', company: 'Global Solutions', status: 'Follow-up' },
    { name: 'Alex Turner', role: 'CEO', company: 'InnovateCo', status: 'Active' },
    { name: 'Lisa Wang', role: 'Director of Eng', company: 'CloudFirst', status: 'Inactive' },
  ];

  return (
    <div>
      <AppBar />

      <div className="flex items-center justify-between mb-l">
        <Tablist selectedValue={activeTab} onTabSelect={setActiveTab}>
          <Tab value="contacts">Contacts</Tab>
          <Tab value="pipeline">Pipeline</Tab>
          <Tab value="activity">Activity</Tab>
        </Tablist>
        <Button appearance="primary" onClick={() => setDialogOpen(true)}>
          + New Contact
        </Button>
      </div>

      {activeTab === 'contacts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-m">
          {contacts.map((c) => (
            <ContactCard key={c.name} {...c} onEdit={() => {}} />
          ))}
        </div>
      )}

      {activeTab === 'pipeline' && (
        <div className="flex gap-l overflow-x-auto pb-m">
          <PipelineColumn title="Leads" count={3} color="bg-brand-foreground-1"
            items={[
              { name: 'TechStart Inc', value: '$25,000', days: 2 },
              { name: 'DataFlow', value: '$15,000', days: 5 },
              { name: 'CloudFirst', value: '$40,000', days: 1 },
            ]} />
          <PipelineColumn title="Qualified" count={2} color="bg-status-warning"
            items={[
              { name: 'Global Solutions', value: '$80,000', days: 7 },
              { name: 'InnovateCo', value: '$35,000', days: 3 },
            ]} />
          <PipelineColumn title="Proposal" count={2} color="bg-status-success"
            items={[
              { name: 'Acme Corp', value: '$120,000', days: 1 },
              { name: 'MegaTech', value: '$95,000', days: 4 },
            ]} />
          <PipelineColumn title="Closed Won" count={1} color="bg-status-success-foreground-1"
            items={[
              { name: 'Enterprise Ltd', value: '$200,000', days: 0 },
            ]} />
        </div>
      )}

      {activeTab === 'activity' && (
        <Card appearance="outline" className="p-l">
          <Text variant="subtitle2" block className="mb-m">Recent Activity</Text>
          <ActivityFeed />
        </Card>
      )}

      <NewContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
