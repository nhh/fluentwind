import type { HTMLAttributes, ReactNode } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  /** Visual appearance. */
  appearance?: 'filled' | 'ghost' | 'outline' | 'tint';
  /** Badge color. */
  color?: 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning';
  /** Size of the badge. */
  size?: 'tiny' | 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
  /** Shape of the badge. */
  shape?: 'rounded' | 'square' | 'circular';
  /** Icon displayed in the badge. */
  icon?: ReactNode;
  /** Position of the icon. */
  iconPosition?: 'before' | 'after';
}
