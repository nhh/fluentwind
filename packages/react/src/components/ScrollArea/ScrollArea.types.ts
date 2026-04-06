import type { HTMLAttributes } from 'react';

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal' | 'both';
  type?: 'auto' | 'always' | 'hover' | 'scroll';
}
