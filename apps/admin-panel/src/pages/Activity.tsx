import React, { useState } from 'react';
import {
  Card,
  Text,
  Avatar,
  Badge,
  Tag,
  Timeline,
  TimelineItem,
  Searchbox,
  Select,
  Button,
  Persona,
  Divider,
} from '@fluentwind/react';
import { Plus, RefreshCw, Trash2, LogIn, Server } from 'lucide-react';
import { activityEvents } from '../data/mock';

const typeIcon: Record<string, React.ReactNode> = {
  create: <Plus size={14} />,
  update: <RefreshCw size={14} />,
  delete: <Trash2 size={14} />,
  login: <LogIn size={14} />,
  system: <Server size={14} />,
};

const typeLabel: Record<string, string> = {
  create: 'Created',
  update: 'Updated',
  delete: 'Deleted',
  login: 'Login',
  system: 'System',
};

const typeColor: Record<string, 'success' | 'brand' | 'danger' | 'subtle' | 'warning'> = {
  create: 'success',
  update: 'brand',
  delete: 'danger',
  login: 'subtle',
  system: 'warning',
};

const dotColor: Record<string, 'success' | 'brand' | 'danger' | 'neutral' | 'warning'> = {
  create: 'success',
  update: 'brand',
  delete: 'danger',
  login: 'neutral',
  system: 'warning',
};

export default function Activity() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = activityEvents.filter((e) => {
    const matchesSearch =
      e.user.toLowerCase().includes(search.toLowerCase()) ||
      e.target.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || e.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-l">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-m">
        {(['create', 'update', 'delete', 'login', 'system'] as const).map((type) => {
          const count = activityEvents.filter((e) => e.type === type).length;
          return (
            <Card key={type} className="p-m text-center">
              <Badge color={typeColor[type]} appearance="tint" size="medium" className="mb-xs" icon={typeIcon[type]}>
                {typeLabel[type]}
              </Badge>
              <div className="text-500 leading-500 font-semibold text-neutral-foreground-1">
                {count}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-l">
        <div className="flex flex-wrap items-center gap-m mb-l">
          <Searchbox
            placeholder="Search activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onDismiss={() => setSearch('')}
            className="w-64"
          />
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="create">Created</option>
            <option value="update">Updated</option>
            <option value="delete">Deleted</option>
            <option value="login">Login</option>
            <option value="system">System</option>
          </Select>
          <div className="flex-1" />
          <Text className="text-200 text-neutral-foreground-3">
            {filtered.length} events
          </Text>
        </div>

        {/* Timeline */}
        <Timeline mode="left">
          {filtered.map((event) => (
            <TimelineItem
              key={event.id}
              color={dotColor[event.type]}
              label={
                <span className="text-200 text-neutral-foreground-3 whitespace-nowrap">
                  {event.time}
                </span>
              }
            >
              <div className="flex items-start gap-m p-s rounded-medium hover:bg-subtle-background-hover transition-colors">
                <Avatar name={event.user} size={32} color="colorful" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-s flex-wrap">
                    <span className="font-semibold text-neutral-foreground-1">{event.user}</span>
                    <Badge color={typeColor[event.type]} appearance="tint" size="small" icon={typeIcon[event.type]}>
                      {typeLabel[event.type]}
                    </Badge>
                  </div>
                  <div className="text-200 text-neutral-foreground-2 mt-xxs">
                    {event.action} {event.target}
                  </div>
                </div>
              </div>
            </TimelineItem>
          ))}
        </Timeline>

        {filtered.length === 0 && (
          <div className="text-center py-xl text-neutral-foreground-3">
            No activity events match your filters.
          </div>
        )}
      </Card>
    </div>
  );
}
