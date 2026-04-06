import type { HTMLAttributes } from 'react';

export interface QRCodeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The text/URL to encode. */
  value: string;
  /** Size of the QR code in pixels. */
  size?: number;
  /** Error correction level. */
  level?: 'L' | 'M' | 'Q' | 'H';
  /** Background color. */
  bgColor?: string;
  /** Foreground (module) color. */
  fgColor?: string;
  /** Whether to include a quiet-zone margin. */
  includeMargin?: boolean;
}
