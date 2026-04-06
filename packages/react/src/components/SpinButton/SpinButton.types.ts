import type { InputHTMLAttributes } from 'react';

export interface SpinButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> {
  /** Current value. */
  value?: number;
  /** Default value (uncontrolled). */
  defaultValue?: number;
  /** Callback when value changes. */
  onChange?: (value: number) => void;
  /** Minimum value. */
  min?: number;
  /** Maximum value. */
  max?: number;
  /** Step increment. */
  step?: number;
  /** Size of the spin button. */
  size?: 'small' | 'medium';
  /** Visual appearance. */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
}
