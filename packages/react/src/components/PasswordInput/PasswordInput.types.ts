import type { InputHTMLAttributes } from 'react';

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visual appearance. */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
  /** Size of the input. */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show the visibility toggle button. */
  showToggle?: boolean;
}
