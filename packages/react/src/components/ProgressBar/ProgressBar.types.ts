import type { HTMLAttributes } from 'react';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value (0–max). If omitted, shows indeterminate animation. */
  value?: number;
  /** Maximum value. Defaults to 1. */
  max?: number;
  /** Thickness of the bar. */
  thickness?: 'medium' | 'large';
  /** Color of the progress bar. */
  color?: 'brand' | 'success' | 'warning' | 'error';
  /** Shape of the bar corners. */
  shape?: 'rounded' | 'square';
}
