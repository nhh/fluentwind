import type { HTMLAttributes, ReactNode } from 'react';

export interface NavProps extends HTMLAttributes<HTMLElement> {
  /** Size of the nav items. */
  size?: 'small' | 'medium' | 'large';
  children?: ReactNode;
}

export interface NavItemProps extends HTMLAttributes<HTMLElement> {
  /** Unique value identifying the nav item. */
  value: string;
  /** Icon displayed before the label. */
  icon?: ReactNode;
  /** Whether the item is currently selected. */
  selected?: boolean;
  /** Link href. Renders as anchor when provided. */
  href?: string;
  /** Click handler. */
  onClick?: () => void;
  children?: ReactNode;
}
