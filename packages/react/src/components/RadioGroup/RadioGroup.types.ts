import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Name attribute shared by all radio inputs in the group. */
  name?: string;
  /** Currently selected value (controlled). */
  value?: string;
  /** Default value (uncontrolled). */
  defaultValue?: string;
  /** Callback when selection changes. */
  onValueChange?: (value: string) => void;
  /** Layout direction. */
  layout?: 'horizontal' | 'vertical';
  /** Disables the entire group. */
  disabled?: boolean;
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** The value of this radio option. */
  value: string;
  /** Label for the radio option. */
  label?: ReactNode;
}
