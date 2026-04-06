import type { HTMLAttributes } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  /** Orientation. */
  vertical?: boolean;
  /** Visual appearance. */
  appearance?: 'default' | 'subtle' | 'brand' | 'strong';
  /** Alignment of the content within the divider. */
  alignContent?: 'start' | 'center' | 'end';
  /** Whether the divider has inset spacing. */
  inset?: boolean;
}
