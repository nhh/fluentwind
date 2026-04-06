import type { ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Whether the image has a visible border. */
  bordered?: boolean;
  /** Shape of the image. */
  shape?: 'rounded' | 'circular' | 'square';
  /** Shadow elevation applied to the image. */
  shadow?: boolean;
  /** Whether the image should fill its container. */
  block?: boolean;
  /** Fit mode. */
  fit?: 'none' | 'center' | 'contain' | 'cover' | 'default';
}
