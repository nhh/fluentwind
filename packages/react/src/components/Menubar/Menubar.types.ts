import type { HTMLAttributes, ReactNode } from 'react';

export interface MenubarProps extends HTMLAttributes<HTMLDivElement> {}

export interface MenubarMenuProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode;
}

export interface MenubarItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  shortcut?: ReactNode;
  disabled?: boolean;
}

export interface MenubarDividerProps extends HTMLAttributes<HTMLDivElement> {}
