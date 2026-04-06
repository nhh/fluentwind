import type { HTMLAttributes, ReactNode } from 'react';

export interface TreeProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled open items. */
  openItems?: string[];
  /** Default open items. */
  defaultOpenItems?: string[];
  /** Called when items are expanded/collapsed. */
  onOpenChange?: (openItems: string[]) => void;
}

export interface TreeItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique value for this tree item. */
  value: string;
  /** If true, item is a leaf node (no expand icon). */
  leaf?: boolean;
}

export interface TreeItemLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon before the content. */
  iconBefore?: ReactNode;
  /** Icon after the content. */
  iconAfter?: ReactNode;
}
