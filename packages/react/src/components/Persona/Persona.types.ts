import type { HTMLAttributes, ReactNode } from 'react';

export interface PersonaProps extends HTMLAttributes<HTMLDivElement> {
  /** Primary display name. */
  name?: string;
  /** Secondary text line. */
  secondaryText?: string;
  /** Tertiary text line. */
  tertiaryText?: string;
  /** Quaternary text line. */
  quaternaryText?: string;
  /** Avatar element to display. */
  avatar?: ReactNode;
  /** Size of the persona. */
  size?: 'small' | 'medium' | 'large' | 'extraLarge' | 'huge';
  /** Position of the text relative to the avatar. */
  textPosition?: 'before' | 'after' | 'below';
  /** Text alignment. */
  textAlignment?: 'start' | 'center';
}
