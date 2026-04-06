import { useState } from 'react';
import {
  Card,
  Statistic,
  Badge,
  Tag,
  Avatar,
  ProgressBar,
  Timeline,
  TimelineItem,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  Tablist,
  Tab,
  Text,
  Persona,
} from '@fluentwind/react';
import {
  Users,
  DollarSign,
  Radio,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  ListChecks,
} from 'lucide-react';
import { activityEvents, trafficByDay, orders } from '../data/mock';

const colorForType: Record<string, 'brand' | 'success' | 'warning' | 'danger' | 'neutral'> = {
  create: 'success',
  update: 'brand',
  delete: 'danger',
  login: 'neutral',
  system: 'warning',
};

const orderStatusColor: Record<string, 'success' | 'brand' | 'informative' | 'danger'> = {
  Completed: 'success',
  Processing: 'brand',
  Shipped: 'informative',
  Cancelled: 'danger',
};

export default function Dashboard() {
  const [trafficTab, setTrafficTab] = useState('week');
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Review Q1 analytics report', done: true },
    { id: 2, label: 'Update product pricing page', done: true },
    { id: 3, label: 'Onboard new team members', done: false },
    { id: 4, label: 'Fix checkout flow bug #4501', done: false },
    { id: 5, label: 'Prepare monthly newsletter', done: false },
  ]);

  const completedTasks = tasks.filter((t) => t.done).length;
  const maxTraffic = Math.max(...trafficByDay.map((d) => d.visitors));

  return (
    <div className="space-y-l">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-m">
        <Card className="p-l">
          <Statistic
            title="Total Users"
            value="12,847"
            prefix={<Users size={20} className="text-brand-foreground-1" />}
            trend="up"
            trendValue="12.5%"
            size="large"
          />
        </Card>
        <Card className="p-l">
          <Statistic
            title="Revenue"
            value="$48,295"
            prefix={<DollarSign size={20} className="text-brand-foreground-1" />}
            trend="up"
            trendValue="8.2%"
            size="large"
          />
        </Card>
        <Card className="p-l">
          <Statistic
            title="Active Sessions"
            value="1,429"
            prefix={<Radio size={20} className="text-brand-foreground-1" />}
            trend="down"
            trendValue="3.1%"
            size="large"
          />
        </Card>
        <Card className="p-l">
          <Statistic
            title="Error Rate"
            value="0.12%"
            prefix={<AlertTriangle size={20} className="text-brand-foreground-1" />}
            trend="down"
            trendValue="0.04%"
            size="large"
          />
        </Card>
      </div>

      {/* Middle row: Traffic + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-m">
        {/* Traffic chart (bar chart via progress bars) */}
        <Card className="lg:col-span-2 p-l">
          <div className="flex items-center justify-between mb-m">
            <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1">
              Traffic Overview
            </Text>
            <Tablist
              selectedValue={trafficTab}
              onTabSelect={setTrafficTab}
              size="small"
            >
              <Tab value="day">Day</Tab>
              <Tab value="week">Week</Tab>
              <Tab value="month">Month</Tab>
            </Tablist>
          </div>
          <div className="space-y-s">
            {trafficByDay.map((day) => (
              <div key={day.day} className="flex items-center gap-m">
                <span className="w-8 text-200 text-neutral-foreground-3 font-medium">
                  {day.day}
                </span>
                <div className="flex-1">
                  <ProgressBar
                    value={day.visitors}
                    max={maxTraffic}
                    thickness="large"
                    color="brand"
                    shape="rounded"
                  />
                </div>
                <span className="w-14 text-right text-200 text-neutral-foreground-2 font-medium tabular-nums">
                  {day.visitors.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity feed */}
        <Card className="p-l">
          <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 mb-m block">
            Recent Activity
          </Text>
          <Timeline>
            {activityEvents.slice(0, 6).map((event) => (
              <TimelineItem
                key={event.id}
                color={colorForType[event.type]}
                label={
                  <span className="text-100 text-neutral-foreground-3">{event.time}</span>
                }
              >
                <div className="text-200 leading-200">
                  <span className="font-semibold text-neutral-foreground-1">{event.user}</span>{' '}
                  <span className="text-neutral-foreground-2">
                    {event.action} {event.target}
                  </span>
                </div>
              </TimelineItem>
            ))}
          </Timeline>
        </Card>
      </div>

      {/* Bottom row: Orders + Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-m">
        {/* Recent orders */}
        <Card className="lg:col-span-2 p-l">
          <div className="flex items-center justify-between mb-m">
            <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1">
              Recent Orders
            </Text>
            <Button appearance="subtle" size="small">
              View all <ArrowRight size={14} className="ml-xxs" />
            </Button>
          </div>
          <Table size="small">
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Order</TableHeaderCell>
                <TableHeaderCell>Customer</TableHeaderCell>
                <TableHeaderCell>Product</TableHeaderCell>
                <TableHeaderCell>Amount</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <span className="font-medium text-neutral-foreground-1">{order.id}</span>
                  </TableCell>
                  <TableCell>
                    <Persona
                      name={order.customer}
                      avatar={<Avatar name={order.customer} size={24} color="colorful" />}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell className="font-medium tabular-nums">{order.amount}</TableCell>
                  <TableCell>
                    <Badge
                      color={orderStatusColor[order.status]}
                      appearance="tint"
                      size="small"
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Task checklist */}
        <Card className="p-l">
          <div className="flex items-center justify-between mb-m">
            <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1">
              Tasks
            </Text>
            <Tag size="small" appearance="brand">
              {completedTasks}/{tasks.length}
            </Tag>
          </div>
          <ProgressBar
            value={completedTasks}
            max={tasks.length}
            thickness="medium"
            color="brand"
            className="mb-m"
          />
          <div className="space-y-xs">
            {tasks.map((task) => (
              <label
                key={task.id}
                className="flex items-center gap-s cursor-pointer py-xs px-s rounded-medium hover:bg-subtle-background-hover transition-colors"
              >
                <Checkbox
                  checked={task.done}
                  onChange={() =>
                    setTasks((prev) =>
                      prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)),
                    )
                  }
                />
                <span
                  className={`text-200 leading-200 ${
                    task.done
                      ? 'line-through text-neutral-foreground-4'
                      : 'text-neutral-foreground-1'
                  }`}
                >
                  {task.label}
                </span>
              </label>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
