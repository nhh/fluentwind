import type { HTMLAttributes } from 'react';

export interface SpinnerProps extends HTMLAttributes<HTMLElement> {
  /** Size of the spinner. */
  size?: 'tiny' | 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge' | 'huge';
  /** Visual appearance. */
  appearance?: 'primary' | 'inverted';
  /** Label text to display alongside the spinner. */
  label?: string;
  /** Position of the label relative to the spinner. */
  labelPosition?: 'above' | 'below' | 'before' | 'after';
}
