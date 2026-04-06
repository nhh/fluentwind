import type { HTMLAttributes, ReactNode } from 'react';

export type AvatarSize = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Display name used to derive initials. */
  name?: string;
  /** Image source for the avatar. */
  image?: { src: string; alt?: string };
  /** Explicit initials (overrides name-derived initials). */
  initials?: string;
  /** Pixel size of the avatar. */
  size?: AvatarSize;
  /** Shape of the avatar. */
  shape?: 'circular' | 'square';
  /** Color variant. */
  color?: 'neutral' | 'brand' | 'colorful';
  /** Active state indicator. */
  active?: 'active' | 'inactive' | 'unset';
  /** Badge element rendered at the bottom-right corner. */
  badge?: ReactNode;
}
