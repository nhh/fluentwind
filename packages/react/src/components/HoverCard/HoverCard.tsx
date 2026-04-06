import { forwardRef, useState, useRef, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { HoverCardProps } from './HoverCard.types';

const positionStyles: Record<string, string> = {
  above: 'bottom-full left-1/2 -translate-x-1/2 mb-xs',
  below: 'top-full left-1/2 -translate-x-1/2 mt-xs',
  before: 'right-full top-1/2 -translate-y-1/2 mr-xs',
  after: 'left-full top-1/2 -translate-y-1/2 ml-xs',
};

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  (
    {
      content,
      openDelay = 700,
      closeDelay = 300,
      position = 'below',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const openTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const cancelTimers = useCallback(() => {
      clearTimeout(openTimeoutRef.current);
      clearTimeout(closeTimeoutRef.current);
    }, []);

    const startOpen = useCallback(() => {
      cancelTimers();
      openTimeoutRef.current = setTimeout(() => setVisible(true), openDelay);
    }, [openDelay, cancelTimers]);

    const startClose = useCallback(() => {
      cancelTimers();
      closeTimeoutRef.current = setTimeout(() => setVisible(false), closeDelay);
    }, [closeDelay, cancelTimers]);

    const handleCardEnter = useCallback(() => {
      cancelTimers();
    }, [cancelTimers]);

    const handleCardLeave = useCallback(() => {
      startClose();
    }, [startClose]);

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        {...props}
      >
        <div onMouseEnter={startOpen} onMouseLeave={startClose}>
          {children}
        </div>
        {visible && (
          <div
            role="complementary"
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
            className={cn(
              'absolute z-50 bg-neutral-background-1 text-neutral-foreground-1 shadow-16 rounded-medium border border-neutral-stroke-2 p-l min-w-[280px] animate-[fw-fade-slide-in_150ms_var(--ease-decelerate-mid)]',
              positionStyles[position],
            )}
          >
            {content}
          </div>
        )}
      </div>
    );
  },
);

HoverCard.displayName = 'HoverCard';
