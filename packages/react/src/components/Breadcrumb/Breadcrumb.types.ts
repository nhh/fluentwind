import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Size of the breadcrumb items. */
  size?: 'small' | 'medium' | 'large';
  /** Type of divider between items. */
  dividerType?: 'chevron' | 'slash';
  children?: ReactNode;
}

export interface BreadcrumbItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Whether this item represents the current page. */
  current?: boolean;
  children?: ReactNode;
}
