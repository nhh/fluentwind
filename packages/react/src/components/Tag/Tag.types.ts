import type { HTMLAttributes, ReactNode } from 'react';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual appearance. */
  appearance?: 'filled' | 'outline' | 'brand';
  /** Size of the tag. */
  size?: 'small' | 'medium' | 'large';
  /** Shape of the tag. */
  shape?: 'rounded' | 'circular';
  /** Show a dismiss (X) button. */
  dismissible?: boolean;
  /** Called when the dismiss button is clicked. */
  onDismiss?: () => void;
  /** Icon displayed before the text. */
  icon?: ReactNode;
  /** Disables the tag. */
  disabled?: boolean;
}
