import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { SearchboxProps } from './Searchbox.types';

const wrapperVariants = cva(
  'inline-flex items-center gap-xxs transition-colors duration-fast focus-within:ring-2 focus-within:ring-neutral-stroke-focus-2 focus-within:ring-offset-1 focus-within:ring-offset-neutral-stroke-focus-1',
  {
    variants: {
      appearance: {
        outline:
          'bg-neutral-background-1 border border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-within:border-brand-stroke-1 focus-within:border-b-2',
        underline:
          'bg-transparent-background border-b border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-within:border-brand-stroke-1 focus-within:border-b-2',
        filledDarker:
          'bg-neutral-background-3 border border-transparent border-b-neutral-stroke-accessible focus-within:border-b-brand-stroke-1 focus-within:border-b-2',
        filledLighter:
          'bg-neutral-background-1 border border-transparent border-b-neutral-stroke-accessible focus-within:border-b-brand-stroke-1 focus-within:border-b-2',
      },
      size: {
        small: 'text-200 leading-200 px-s py-xxs min-h-6 rounded-medium',
        medium: 'text-300 leading-300 px-s py-xs min-h-8 rounded-medium',
        large: 'text-400 leading-400 px-m py-s min-h-10 rounded-large',
      },
    },
    defaultVariants: { appearance: 'outline', size: 'medium' },
  },
);

export const Searchbox = forwardRef<HTMLInputElement, SearchboxProps>(
  ({ appearance, size, disabled, onDismiss, className, value, ...props }, ref) => {
    return (
      <span
        className={cn(
          wrapperVariants({ appearance, size }),
          disabled && 'opacity-50 cursor-not-allowed bg-neutral-background-disabled border-neutral-stroke-disabled',
          className,
        )}
      >
        <svg className="shrink-0 text-neutral-foreground-3" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M11.5 11.5L14 14M9.5 5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0v0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="translate(1,1)" />
        </svg>
        <input
          ref={ref}
          type="search"
          disabled={disabled}
          value={value}
          className="flex-1 bg-transparent outline-none text-neutral-foreground-1 placeholder:text-neutral-foreground-4 disabled:cursor-not-allowed min-w-0 [&::-webkit-search-cancel-button]:hidden"
          {...props}
        />
        {value && onDismiss && (
          <button
            type="button"
            tabIndex={-1}
            onClick={onDismiss}
            className="shrink-0 text-neutral-foreground-3 hover:text-neutral-foreground-1 cursor-pointer"
            aria-label="Clear"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </span>
    );
  },
);

Searchbox.displayName = 'Searchbox';
