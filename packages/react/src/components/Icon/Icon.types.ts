import type { SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGElement> {
  /** Size of the icon in pixels. Maps to Fluent icon sizes. */
  size?: 12 | 16 | 20 | 24 | 28 | 32 | 48;
  /** Whether the icon uses the filled variant style. */
  filled?: boolean;
  /** Accessible label. If omitted, icon is treated as decorative. */
  label?: string;
}
