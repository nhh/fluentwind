import type { HTMLAttributes, ElementType } from 'react';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** The HTML element to render. Defaults based on variant. */
  as?: ElementType;
  /** Predefined type ramp variant. */
  variant?:
    | 'caption2'
    | 'caption2Strong'
    | 'caption1'
    | 'caption1Strong'
    | 'caption1Stronger'
    | 'body1'
    | 'body1Strong'
    | 'body1Stronger'
    | 'subtitle2'
    | 'subtitle2Stronger'
    | 'subtitle1'
    | 'title3'
    | 'title2'
    | 'title1'
    | 'largeTitle'
    | 'display';
  /** Whether text should wrap. */
  wrap?: boolean;
  /** Truncate text with ellipsis. */
  truncate?: boolean;
  /** Text alignment. */
  align?: 'start' | 'center' | 'end' | 'justify';
  /** Whether the text uses a monospace font. */
  font?: 'base' | 'mono' | 'numeric';
  /** Italic text. */
  italic?: boolean;
  /** Underline text. */
  underline?: boolean;
  /** Strikethrough text. */
  strikethrough?: boolean;
  /** Block display (full width). */
  block?: boolean;
}
