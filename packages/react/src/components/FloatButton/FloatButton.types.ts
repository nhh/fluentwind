import type { HTMLAttributes, ReactNode } from 'react';

export interface FloatButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  tooltip?: ReactNode;
  type?: 'default' | 'primary';
  shape?: 'circle' | 'square';
  href?: string;
  target?: string;
  badge?: ReactNode;
}

export interface FloatButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  trigger?: 'click' | 'hover';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  icon?: ReactNode;
  shape?: 'circle' | 'square';
  type?: 'default' | 'primary';
}
