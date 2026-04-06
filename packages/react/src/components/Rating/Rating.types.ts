import type { HTMLAttributes } from 'react';

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'color'> {
  /** Controlled value. */
  value?: number;
  /** Default value (uncontrolled). */
  defaultValue?: number;
  /** Maximum number of stars. */
  max?: number;
  /** Size of the rating stars. */
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
  /** Color of the filled stars. */
  color?: 'brand' | 'marigold' | 'neutral';
  /** Called when the value changes. */
  onChange?: (value: number) => void;
  /** Read-only mode. */
  readOnly?: boolean;
}
