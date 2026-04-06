import type { HTMLAttributes } from 'react';

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Enable auto-play. */
  autoplay?: boolean;
  /** Auto-play interval in ms. */
  autoplayInterval?: number;
  /** Controlled active index. */
  activeIndex?: number;
  /** Default active index. */
  defaultActiveIndex?: number;
  /** Called when the active index changes. */
  onActiveIndexChange?: (index: number) => void;
}

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {}
