import {
  Card,
  Statistic,
  ProgressBar,
  Text,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  Tablist,
  Tab,
  Divider,
} from '@fluentwind/react';
import { useState } from 'react';
import { Eye, UserCheck, ArrowDownRight, Clock, Monitor, Smartphone, Tablet, Globe, Filter as FilterIcon } from 'lucide-react';
import { browserStats, pageStats } from '../data/mock';

const deviceStats = [
  { label: 'Desktop', value: 15200, percentage: 65 },
  { label: 'Mobile', value: 6340, percentage: 27 },
  { label: 'Tablet', value: 1902, percentage: 8 },
];

const conversionData = [
  { stage: 'Page View', count: 23442, rate: '100%' },
  { stage: 'Add to Cart', count: 8204, rate: '35.0%' },
  { stage: 'Checkout Started', count: 4102, rate: '17.5%' },
  { stage: 'Payment Entered', count: 2872, rate: '12.2%' },
  { stage: 'Order Completed', count: 2051, rate: '8.8%' },
];

export default function Analytics() {
  const [periodTab, setPeriodTab] = useState('7d');

  return (
    <div className="space-y-l">
      {/* Period selector */}
      <div className="flex items-center justify-between">
        <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1">
          Analytics Overview
        </Text>
        <Tablist
          selectedValue={periodTab}
          onTabSelect={setPeriodTab}
          size="small"
        >
          <Tab value="24h">24h</Tab>
          <Tab value="7d">7 Days</Tab>
          <Tab value="30d">30 Days</Tab>
          <Tab value="90d">90 Days</Tab>
        </Tablist>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-m">
        <Card className="p-l">
          <Statistic title="Page Views" value="23,442" trend="up" trendValue="18.2%" size="medium" prefix={<Eye size={18} className="text-brand-foreground-1" />} />
        </Card>
        <Card className="p-l">
          <Statistic title="Unique Visitors" value="8,291" trend="up" trendValue="12.7%" size="medium" prefix={<UserCheck size={18} className="text-brand-foreground-1" />} />
        </Card>
        <Card className="p-l">
          <Statistic title="Bounce Rate" value="42.3%" trend="down" trendValue="2.1%" size="medium" prefix={<ArrowDownRight size={18} className="text-brand-foreground-1" />} />
        </Card>
        <Card className="p-l">
          <Statistic title="Avg. Session" value="4m 32s" trend="up" trendValue="0.8%" size="medium" prefix={<Clock size={18} className="text-brand-foreground-1" />} />
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-m">
        {/* Browser breakdown */}
        <Card className="p-l">
          <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 mb-m block">
            Browser Usage
          </Text>
          <div className="space-y-m">
            {browserStats.map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-between mb-xxs">
                  <span className="text-200 font-medium text-neutral-foreground-1">
                    {stat.label}
                  </span>
                  <span className="text-200 text-neutral-foreground-3 tabular-nums">
                    {stat.percentage}% ({stat.value.toLocaleString()})
                  </span>
                </div>
                <ProgressBar
                  value={stat.percentage}
                  max={100}
                  thickness="large"
                  color="brand"
                  shape="rounded"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Device breakdown */}
        <Card className="p-l">
          <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 mb-m block">
            Device Breakdown
          </Text>
          <div className="space-y-m">
            {deviceStats.map((stat) => (
              <div key={stat.label}>
                <div className="flex justify-between mb-xxs">
                  <span className="text-200 font-medium text-neutral-foreground-1">
                    {stat.label}
                  </span>
                  <span className="text-200 text-neutral-foreground-3 tabular-nums">
                    {stat.percentage}% ({stat.value.toLocaleString()})
                  </span>
                </div>
                <ProgressBar
                  value={stat.percentage}
                  max={100}
                  thickness="large"
                  color={stat.label === 'Desktop' ? 'brand' : stat.label === 'Mobile' ? 'success' : 'warning'}
                  shape="rounded"
                />
              </div>
            ))}
          </div>
          <Divider className="my-m" />
          <div className="grid grid-cols-3 gap-m text-center">
            {deviceStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-500 leading-500 font-semibold text-neutral-foreground-1">
                  {stat.percentage}%
                </div>
                <div className="text-200 text-neutral-foreground-3">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tables row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-m">
        {/* Top pages */}
        <Card className="p-l">
          <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 mb-m block">
            Top Pages
          </Text>
          <Table size="small">
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Page</TableHeaderCell>
                <TableHeaderCell>Views</TableHeaderCell>
                <TableHeaderCell>Share</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageStats.map((stat) => (
                <TableRow key={stat.label}>
                  <TableCell>
                    <span className="font-mono text-200 text-neutral-foreground-1">
                      {stat.label}
                    </span>
                  </TableCell>
                  <TableCell className="tabular-nums">{stat.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-s">
                      <ProgressBar
                        value={stat.percentage}
                        max={100}
                        thickness="medium"
                        color="brand"
                        className="flex-1"
                      />
                      <span className="text-200 tabular-nums w-10 text-right">
                        {stat.percentage}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Conversion funnel */}
        <Card className="p-l">
          <Text className="text-400 leading-400 font-semibold text-neutral-foreground-1 mb-m block">
            Conversion Funnel
          </Text>
          <Table size="small">
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Stage</TableHeaderCell>
                <TableHeaderCell>Users</TableHeaderCell>
                <TableHeaderCell>Rate</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversionData.map((row, i) => (
                <TableRow key={row.stage}>
                  <TableCell>
                    <div className="flex items-center gap-s">
                      <Badge
                        color={i === 0 ? 'brand' : i === conversionData.length - 1 ? 'success' : 'subtle'}
                        size="small"
                        appearance="filled"
                      >
                        {i + 1}
                      </Badge>
                      <span className="text-neutral-foreground-1">{row.stage}</span>
                    </div>
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {row.count.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      color={parseFloat(row.rate) > 30 ? 'success' : parseFloat(row.rate) > 10 ? 'warning' : 'danger'}
                      appearance="tint"
                      size="small"
                    >
                      {row.rate}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
