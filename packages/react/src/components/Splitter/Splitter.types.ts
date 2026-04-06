import type { HTMLAttributes } from 'react';

export interface SplitterProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export interface SplitterPanelProps extends HTMLAttributes<HTMLDivElement> {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

export interface SplitterResizeHandleProps extends HTMLAttributes<HTMLDivElement> {}
