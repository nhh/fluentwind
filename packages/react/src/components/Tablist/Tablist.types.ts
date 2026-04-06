import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface TablistProps extends HTMLAttributes<HTMLDivElement> {
  /** The currently selected tab value. */
  selectedValue?: string;
  /** Callback when a tab is selected. */
  onTabSelect?: (value: string) => void;
  /** Size of the tabs. */
  size?: 'small' | 'medium' | 'large';
  /** Visual appearance of the tab bar. */
  appearance?: 'transparent' | 'subtle';
  /** Whether the tablist is vertical. */
  vertical?: boolean;
  children?: ReactNode;
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Unique value identifying the tab. */
  value: string;
  /** Icon displayed before the label. */
  icon?: ReactNode;
  /** Whether the tab is disabled. */
  disabled?: boolean;
  children?: ReactNode;
}
