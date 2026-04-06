import type { HTMLAttributes, ReactNode } from 'react';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /** The aspect ratio as width/height (e.g. 16/9, 4/3, 1). */
  ratio?: number;
  children: ReactNode;
}
