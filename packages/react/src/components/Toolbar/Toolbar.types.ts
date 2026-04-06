import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of toolbar items. */
  size?: 'small' | 'medium' | 'large';
  /** Whether the toolbar is vertical. */
  vertical?: boolean;
  children?: ReactNode;
}

export interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon displayed before or as the content. */
  icon?: ReactNode;
  /** Whether the button shows only an icon. */
  iconOnly?: boolean;
  /** Visual appearance. */
  appearance?: 'subtle' | 'transparent';
  children?: ReactNode;
}
