import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Label } from '../Label/Label';
import type { InfoLabelProps } from './InfoLabel.types';

export const InfoLabel = forwardRef<HTMLLabelElement, InfoLabelProps>(
  ({ info, className, children, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Close on outside click
    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(e.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    return (
      <div className="flex items-center gap-xs w-fit">
        <Label ref={ref} className={className} {...props}>
          {children}
        </Label>
        <span className="relative inline-flex">
          <button
            ref={buttonRef}
            type="button"
            aria-label="More information"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'inline-flex items-center justify-center h-5 w-5 rounded-circular text-neutral-foreground-3 bg-transparent',
              'hover:text-neutral-foreground-2 hover:bg-subtle-background-hover transition-colors duration-fast',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
              'cursor-pointer',
            )}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="4.75" r="0.75" fill="currentColor" />
            </svg>
          </button>
          {open && (
            <div
              ref={popoverRef}
              role="dialog"
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.stopPropagation();
                  setOpen(false);
                  buttonRef.current?.focus();
                }
              }}
              tabIndex={-1}
              className={cn(
                'absolute left-1/2 -translate-x-1/2 top-full mt-xxs z-50',
                'min-w-[200px] max-w-[300px] px-m py-s',
                'bg-neutral-background-1 text-neutral-foreground-1 text-200 leading-200',
                'border border-neutral-stroke-1 rounded-medium shadow-16',
              )}
            >
              {info}
            </div>
          )}
        </span>
      </div>
    );
  },
);

InfoLabel.displayName = 'InfoLabel';
