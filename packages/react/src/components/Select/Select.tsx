import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { SelectProps } from './Select.types';

const wrapperVariants = cva(
  'fw-input-underline relative inline-flex items-center w-full transition-colors duration-fast',
  {
    variants: {
      appearance: {
        outline:
          'bg-neutral-background-1 border border-neutral-stroke-1 hover:border-neutral-stroke-1-hover',
        underline:
          'bg-transparent-background border-b border-neutral-stroke-1 hover:border-neutral-stroke-1-hover',
        filledDarker:
          'bg-neutral-background-3 border border-transparent border-b-neutral-stroke-accessible',
        filledLighter:
          'bg-neutral-background-1 border border-transparent border-b-neutral-stroke-accessible',
      },
      size: {
        small: 'text-200 leading-200 px-s py-xxs min-h-6 rounded-medium',
        medium: 'text-300 leading-300 px-s py-xs min-h-8 rounded-medium',
        large: 'text-400 leading-400 px-m py-s min-h-10 rounded-large',
      },
    },
    defaultVariants: {
      appearance: 'outline',
      size: 'medium',
    },
  },
);

const ChevronDown = () => (
  <svg className="shrink-0 text-neutral-foreground-3 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ appearance, size, disabled, className, ...props }, ref) => {
    return (
      <span
        className={cn(
          wrapperVariants({ appearance, size }),
          disabled && 'opacity-50 cursor-not-allowed bg-neutral-background-disabled',
          className,
        )}
      >
        <select
          ref={ref}
          disabled={disabled}
          className="flex-1 appearance-none bg-transparent cursor-pointer outline-none text-neutral-foreground-1 disabled:cursor-not-allowed min-w-0"
          {...props}
        />
        <ChevronDown />
      </span>
    );
  },
);

Select.displayName = 'Select';
