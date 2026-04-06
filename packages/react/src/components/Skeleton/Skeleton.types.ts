import type { HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export interface SkeletonItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Shape of the skeleton item. */
  shape?: 'rectangle' | 'circle' | 'square';
  /** Size in pixels (used for circle/square width and height). */
  size?: number;
  /** Animation type. */
  animation?: 'wave' | 'pulse';
}
