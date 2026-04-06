import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface MenuProps {
  /** Whether the menu is open. */
  open?: boolean;
  /** Callback when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export interface MenuTriggerProps {
  children: ReactNode;
}

export interface MenuPopoverProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon displayed before the label. */
  icon?: ReactNode;
  /** Secondary content displayed after the label. */
  secondaryContent?: ReactNode;
  children?: ReactNode;
}

export interface MenuDividerProps extends HTMLAttributes<HTMLDivElement> {}

export interface MenuSubProps {
  /** Label for the submenu trigger. */
  label: ReactNode;
  /** Icon displayed before the label. */
  icon?: ReactNode;
  children: ReactNode;
}
