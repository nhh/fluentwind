import type { HTMLAttributes } from 'react';

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the drawer is open. */
  open: boolean;
  /** Called when the open state changes. */
  onOpenChange: (open: boolean) => void;
  /** Side the drawer appears from. */
  position?: 'start' | 'end' | 'bottom';
  /** Size of the drawer. */
  size?: 'small' | 'medium' | 'large' | 'full';
  /** Type of the drawer. */
  type?: 'overlay' | 'inline';
}
