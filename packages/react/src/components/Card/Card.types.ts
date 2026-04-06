import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the card affecting padding. */
  size?: 'small' | 'medium' | 'large';
  /** Visual appearance of the card. */
  appearance?: 'filled' | 'filledAlternative' | 'outline' | 'subtle';
  /** Layout orientation. */
  orientation?: 'horizontal' | 'vertical';
  /** Whether the card can be selected. */
  selectable?: boolean;
  /** Whether the card is currently selected. */
  selected?: boolean;
  /** Callback when selection changes. */
  onSelectionChange?: (selected: boolean) => void;
  children?: ReactNode;
}
