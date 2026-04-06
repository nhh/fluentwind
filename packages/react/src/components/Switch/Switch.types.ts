import type { InputHTMLAttributes, ReactNode } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label displayed next to the switch. */
  label?: ReactNode;
  /** Position of the label. */
  labelPosition?: 'before' | 'after' | 'above';
}
