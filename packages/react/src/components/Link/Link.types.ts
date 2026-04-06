import type { AnchorHTMLAttributes } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Visual style of the link. */
  appearance?: 'default' | 'subtle';
  /** Whether the link is displayed inline or standalone. */
  inline?: boolean;
  /** Disables the link. */
  disabled?: boolean;
}
