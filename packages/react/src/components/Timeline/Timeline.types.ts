import type { HTMLAttributes, ReactNode } from 'react';

export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  /** Layout mode for content placement relative to the line. */
  mode?: 'left' | 'right' | 'alternate';
}

export interface TimelineItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom dot element to replace the default circle. */
  dot?: ReactNode;
  /** Color of the dot indicator. */
  color?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
  /** Label displayed on the opposite side of the content. */
  label?: ReactNode;
}
