import type { LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Size of the label text. */
  size?: 'small' | 'medium' | 'large';
  /** Font weight. */
  weight?: 'regular' | 'semibold';
  /** Disables the label visually. */
  disabled?: boolean;
  /** Shows a required indicator (*). */
  required?: boolean;
}
