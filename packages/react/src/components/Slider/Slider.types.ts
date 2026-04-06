import type { InputHTMLAttributes } from 'react';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the slider. */
  size?: 'small' | 'medium';
  /** Whether the slider is vertical. */
  vertical?: boolean;
}
