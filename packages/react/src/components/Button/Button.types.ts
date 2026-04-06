import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. */
  appearance?: 'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent';
  /** Size of the button. */
  size?: 'small' | 'medium' | 'large';
  /** Shape of the button corners. */
  shape?: 'rounded' | 'circular' | 'square';
  /** Icon displayed before or after the text. */
  icon?: ReactNode;
  /** Position of the icon relative to the text. */
  iconPosition?: 'before' | 'after';
  /** Renders the button as icon-only (no text). */
  iconOnly?: boolean;
  /** Disables the button but keeps it focusable for accessibility. */
  disabledFocusable?: boolean;
}
