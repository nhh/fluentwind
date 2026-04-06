export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  avatar?: string;
}

export const users: User[] = [
  { id: 1, name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'Admin', status: 'Active', lastLogin: '2 min ago' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus.j@example.com', role: 'Editor', status: 'Active', lastLogin: '15 min ago' },
  { id: 3, name: 'Elena Petrova', email: 'elena.p@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '3 days ago' },
  { id: 4, name: 'James Wilson', email: 'james.w@example.com', role: 'Editor', status: 'Active', lastLogin: '1 hour ago' },
  { id: 5, name: 'Aisha Rahman', email: 'aisha.r@example.com', role: 'Admin', status: 'Active', lastLogin: '30 min ago' },
  { id: 6, name: 'David Park', email: 'david.p@example.com', role: 'Viewer', status: 'Pending', lastLogin: 'Never' },
  { id: 7, name: 'Lisa Martinez', email: 'lisa.m@example.com', role: 'Editor', status: 'Active', lastLogin: '5 hours ago' },
  { id: 8, name: 'Tom Anderson', email: 'tom.a@example.com', role: 'Viewer', status: 'Active', lastLogin: '1 day ago' },
  { id: 9, name: 'Nina Volkov', email: 'nina.v@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2 weeks ago' },
  { id: 10, name: 'Chris Taylor', email: 'chris.t@example.com', role: 'Viewer', status: 'Pending', lastLogin: 'Never' },
  { id: 11, name: 'Mei Lin', email: 'mei.l@example.com', role: 'Admin', status: 'Active', lastLogin: '45 min ago' },
  { id: 12, name: 'Alex Novak', email: 'alex.n@example.com', role: 'Editor', status: 'Active', lastLogin: '2 hours ago' },
];

export interface ActivityEvent {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'create' | 'update' | 'delete' | 'login' | 'system';
}

export const activityEvents: ActivityEvent[] = [
  { id: 1, user: 'Sarah Chen', action: 'created', target: 'new product "Widget Pro"', time: '2 min ago', type: 'create' },
  { id: 2, user: 'Marcus Johnson', action: 'updated', target: 'pricing for "Basic Plan"', time: '15 min ago', type: 'update' },
  { id: 3, user: 'System', action: 'completed', target: 'daily backup', time: '1 hour ago', type: 'system' },
  { id: 4, user: 'James Wilson', action: 'deleted', target: '3 draft articles', time: '2 hours ago', type: 'delete' },
  { id: 5, user: 'Aisha Rahman', action: 'logged in', target: 'from new device', time: '3 hours ago', type: 'login' },
  { id: 6, user: 'Lisa Martinez', action: 'updated', target: 'team permissions', time: '4 hours ago', type: 'update' },
  { id: 7, user: 'System', action: 'sent', target: '1,247 notification emails', time: '5 hours ago', type: 'system' },
  { id: 8, user: 'Tom Anderson', action: 'created', target: 'support ticket #4521', time: '6 hours ago', type: 'create' },
  { id: 9, user: 'Sarah Chen', action: 'updated', target: 'billing information', time: '8 hours ago', type: 'update' },
  { id: 10, user: 'Nina Volkov', action: 'deleted', target: 'expired API key', time: '1 day ago', type: 'delete' },
];

export interface AnalyticsStat {
  label: string;
  value: number;
  percentage: number;
}

export const browserStats: AnalyticsStat[] = [
  { label: 'Chrome', value: 14523, percentage: 62 },
  { label: 'Safari', value: 5870, percentage: 25 },
  { label: 'Firefox', value: 1642, percentage: 7 },
  { label: 'Edge', value: 938, percentage: 4 },
  { label: 'Other', value: 469, percentage: 2 },
];

export const pageStats: AnalyticsStat[] = [
  { label: '/dashboard', value: 8432, percentage: 100 },
  { label: '/products', value: 6210, percentage: 74 },
  { label: '/pricing', value: 4891, percentage: 58 },
  { label: '/about', value: 3102, percentage: 37 },
  { label: '/contact', value: 1847, percentage: 22 },
];

export const trafficByDay = [
  { day: 'Mon', visitors: 1240 },
  { day: 'Tue', visitors: 1580 },
  { day: 'Wed', visitors: 1820 },
  { day: 'Thu', visitors: 1650 },
  { day: 'Fri', visitors: 1920 },
  { day: 'Sat', visitors: 890 },
  { day: 'Sun', visitors: 720 },
];

export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: 'Completed' | 'Processing' | 'Shipped' | 'Cancelled';
  date: string;
}

export const orders: Order[] = [
  { id: 'ORD-001', customer: 'Sarah Chen', product: 'Widget Pro', amount: '$299.00', status: 'Completed', date: 'Apr 5, 2026' },
  { id: 'ORD-002', customer: 'Marcus Johnson', product: 'Basic Plan', amount: '$49.00', status: 'Processing', date: 'Apr 5, 2026' },
  { id: 'ORD-003', customer: 'Elena Petrova', product: 'Enterprise Suite', amount: '$1,299.00', status: 'Shipped', date: 'Apr 4, 2026' },
  { id: 'ORD-004', customer: 'James Wilson', product: 'Widget Pro', amount: '$299.00', status: 'Cancelled', date: 'Apr 4, 2026' },
  { id: 'ORD-005', customer: 'Aisha Rahman', product: 'Team Plan', amount: '$199.00', status: 'Completed', date: 'Apr 3, 2026' },
  { id: 'ORD-006', customer: 'David Park', product: 'Basic Plan', amount: '$49.00', status: 'Processing', date: 'Apr 3, 2026' },
];
