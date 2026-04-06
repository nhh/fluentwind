import type { HTMLAttributes } from 'react';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Size passed to child Avatars. */
  size?: number;
  /** Layout mode. */
  layout?: 'spread' | 'stack' | 'pie';
  /** Maximum avatars to display before showing overflow indicator. */
  maxAvatars?: number;
}
