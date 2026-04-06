import type { ReactNode } from 'react';

export type NotificationPlacement = 'top-end' | 'top-start' | 'bottom-end' | 'bottom-start';
export type NotificationIntent = 'info' | 'success' | 'warning' | 'error';

export interface NotificationData {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  intent?: NotificationIntent;
  icon?: ReactNode;
  actions?: ReactNode;
  closable?: boolean;
  duration?: number;
  placement?: NotificationPlacement;
}

export interface NotificationOptions {
  title: ReactNode;
  description?: ReactNode;
  intent?: NotificationIntent;
  icon?: ReactNode;
  actions?: ReactNode;
  closable?: boolean;
  duration?: number;
  placement?: NotificationPlacement;
}

export interface NotificationProviderProps {
  children: ReactNode;
  placement?: NotificationPlacement;
  maxCount?: number;
}

export interface UseNotificationReturn {
  notify: (options: NotificationOptions) => string;
  close: (id: string) => void;
  closeAll: () => void;
}
