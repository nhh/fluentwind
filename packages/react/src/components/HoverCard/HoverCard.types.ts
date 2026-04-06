import type { HTMLAttributes, ReactNode } from 'react';

export interface HoverCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode;
  openDelay?: number;
  closeDelay?: number;
  position?: 'above' | 'below' | 'before' | 'after';
}
