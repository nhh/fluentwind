import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export interface ContextMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ContextMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  shortcut?: ReactNode;
  disabled?: boolean;
}

export interface ContextMenuDividerProps extends HTMLAttributes<HTMLDivElement> {}
