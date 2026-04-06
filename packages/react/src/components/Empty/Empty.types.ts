import type { HTMLAttributes, ReactNode } from 'react';

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom image or illustration to display. */
  image?: ReactNode;
  /** Description text below the image. */
  description?: ReactNode;
  /** Controls the image dimensions and text size. */
  size?: 'small' | 'medium' | 'large';
}
