import {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
  Children,
} from 'react';
import { cn } from '../../utils/cn';
import type { CarouselProps, CarouselItemProps } from './Carousel.types';

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      autoplay = false,
      autoplayInterval = 5000,
      activeIndex: controlledIndex,
      defaultActiveIndex = 0,
      onActiveIndexChange,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
    const activeIndex = controlledIndex ?? internalIndex;
    const count = Children.count(children);
    const timerRef = useRef<ReturnType<typeof setInterval>>();

    const setIndex = useCallback(
      (index: number) => {
        const next = ((index % count) + count) % count;
        if (controlledIndex === undefined) {
          setInternalIndex(next);
        }
        onActiveIndexChange?.(next);
      },
      [count, controlledIndex, onActiveIndexChange],
    );

    const goNext = useCallback(() => setIndex(activeIndex + 1), [activeIndex, setIndex]);
    const goPrev = useCallback(() => setIndex(activeIndex - 1), [activeIndex, setIndex]);

    // Autoplay
    useEffect(() => {
      if (autoplay && count > 1) {
        timerRef.current = setInterval(goNext, autoplayInterval);
        return () => clearInterval(timerRef.current);
      }
    }, [autoplay, autoplayInterval, goNext, count]);

    return (
      <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
        {/* Slides */}
        <div
          className="flex transition-transform duration-normal"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {Children.map(children, (child, i) => (
            <div key={i} className="w-full shrink-0">
              {child}
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goPrev}
              className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-circular inline-flex items-center justify-center',
                'bg-neutral-background-1/80 text-neutral-foreground-1 shadow-4 border border-neutral-stroke-1',
                'hover:bg-neutral-background-1-hover transition-colors duration-fast',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
              )}
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.78 14.78a.75.75 0 0 1-1.06 0l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 1.06L9.06 10l3.72 3.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={goNext}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-circular inline-flex items-center justify-center',
                'bg-neutral-background-1/80 text-neutral-foreground-1 shadow-4 border border-neutral-stroke-1',
                'hover:bg-neutral-background-1-hover transition-colors duration-fast',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
              )}
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L10.94 10 7.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {count > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-xs">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-2 w-2 rounded-circular transition-colors duration-fast',
                  i === activeIndex
                    ? 'bg-brand-background'
                    : 'bg-neutral-background-6 hover:bg-neutral-foreground-3',
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

Carousel.displayName = 'Carousel';

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {children}
      </div>
    );
  },
);

CarouselItem.displayName = 'CarouselItem';
