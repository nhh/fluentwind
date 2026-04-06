import type { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the checkbox. */
  size?: 'medium' | 'large';
  /** Shape of the checkbox indicator. */
  shape?: 'square' | 'circular';
  /** Label displayed next to the checkbox. */
  label?: ReactNode;
  /** Position of the label. */
  labelPosition?: 'before' | 'after';
}
