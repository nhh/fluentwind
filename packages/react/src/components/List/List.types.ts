import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from 'react';

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /** Enables keyboard navigation. */
  navigable?: boolean;
}

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Secondary text displayed below the primary content. */
  secondaryText?: ReactNode;
  /** Leading media element (icon, avatar, etc.). */
  media?: ReactNode;
  /** Trailing action element. */
  action?: ReactNode;
  /** Whether the item is selected. */
  selected?: boolean;
}
