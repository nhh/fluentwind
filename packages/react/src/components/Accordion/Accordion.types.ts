import type { HTMLAttributes, ReactNode } from 'react';

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Allow multiple items open at once. */
  multiple?: boolean;
  /** Allow collapsing all items (default true). */
  collapsible?: boolean;
  /** Controlled open items by value. */
  openItems?: string[];
  /** Default open items (uncontrolled). */
  defaultOpenItems?: string[];
  /** Called when open items change. */
  onToggle?: (openItems: string[]) => void;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique value identifying this item. */
  value: string;
}

export interface AccordionHeaderProps extends HTMLAttributes<HTMLButtonElement> {
  /** Icon displayed before the header text. */
  icon?: ReactNode;
  /** Size of the header. */
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
  /** Whether the expand icon is inline or at the start. */
  expandIconPosition?: 'start' | 'end';
}

export interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {}
