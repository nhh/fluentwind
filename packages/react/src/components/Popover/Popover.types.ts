import type { HTMLAttributes, ReactNode } from 'react';

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Whether the popover is open. */
  open?: boolean;
  /** Callback when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Positioning relative to the trigger. */
  positioning?: 'above' | 'below' | 'before' | 'after';
  /** The trigger element. */
  trigger: ReactNode;
  /** The popover content. */
  content: ReactNode;
  children?: ReactNode;
}
