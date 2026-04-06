import { forwardRef, useState, useRef, useEffect, useCallback, useId } from 'react';
import { cn } from '../../utils/cn';
import type { PopoverProps } from './Popover.types';

const positionStyles: Record<string, string> = {
  above: 'bottom-full left-1/2 -translate-x-1/2 mb-xs',
  below: 'top-full left-1/2 -translate-x-1/2 mt-xs',
  before: 'right-full top-1/2 -translate-y-1/2 mr-xs',
  after: 'left-full top-1/2 -translate-y-1/2 ml-xs',
};

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      open: controlledOpen,
      onOpenChange,
      positioning = 'below',
      trigger,
      content,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const containerRef = useRef<HTMLDivElement>(null);
    const popoverId = useId();

    const setOpen = useCallback(
      (value: boolean) => {
        setInternalOpen(value);
        onOpenChange?.(value);
      },
      [onOpenChange],
    );

    const handleTriggerClick = useCallback(() => {
      setOpen(!isOpen);
    }, [isOpen, setOpen]);

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, setOpen]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' && isOpen) {
          e.stopPropagation();
          setOpen(false);
        }
      },
      [isOpen, setOpen],
    );

    return (
      <div
        ref={containerRef}
        className={cn('relative inline-block', className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <div onClick={handleTriggerClick} aria-expanded={isOpen} aria-haspopup="dialog" aria-controls={isOpen ? popoverId : undefined}>{trigger}</div>
        {isOpen && (
          <div
            ref={ref}
            id={popoverId}
            role="dialog"
            className={cn(
              'absolute z-50 bg-neutral-background-1 text-neutral-foreground-1 rounded-medium shadow-16 p-l border border-neutral-stroke-1 min-w-[200px] animate-[fw-fade-slide-in_150ms_var(--ease-decelerate-mid)]',
              positionStyles[positioning],
            )}
          >
            {content}
          </div>
        )}
      </div>
    );
  },
);

Popover.displayName = 'Popover';
