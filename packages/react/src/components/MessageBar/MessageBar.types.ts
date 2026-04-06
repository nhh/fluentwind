import type { HTMLAttributes } from 'react';

export interface MessageBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Intent/severity of the message. */
  intent?: 'info' | 'success' | 'warning' | 'error';
  /** Shape of the message bar. */
  shape?: 'rounded' | 'square';
  /** Layout mode. */
  layout?: 'singleline' | 'multiline';
}

export interface MessageBarBodyProps extends HTMLAttributes<HTMLDivElement> {}

export interface MessageBarTitleProps extends HTMLAttributes<HTMLSpanElement> {}

export interface MessageBarActionsProps extends HTMLAttributes<HTMLDivElement> {}
