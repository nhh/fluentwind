import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size of the input. */
  size?: 'small' | 'medium' | 'large';
  /** Visual appearance. */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
  /** Content rendered before the input text (e.g. icon). */
  contentBefore?: ReactNode;
  /** Content rendered after the input text (e.g. icon or button). */
  contentAfter?: ReactNode;
}
