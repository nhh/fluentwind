import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { SelectProps } from './Select.types';

const selectVariants = cva(
  'appearance-none cursor-pointer bg-no-repeat bg-[right_8px_center] bg-[length:12px] pr-xl transition-colors duration-fast outline-none text-neutral-foreground-1 focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
  {
    variants: {
      appearance: {
        outline:
          'bg-neutral-background-1 border border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-visible:border-brand-stroke-1',
        underline:
          'bg-transparent-background border-b border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-visible:border-brand-stroke-1',
        filledDarker:
          'bg-neutral-background-3 border border-transparent border-b-neutral-stroke-accessible focus-visible:border-b-brand-stroke-1',
        filledLighter:
          'bg-neutral-background-1 border border-transparent border-b-neutral-stroke-accessible focus-visible:border-b-brand-stroke-1',
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

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ appearance, size, disabled, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        disabled={disabled}
        className={cn(
          selectVariants({ appearance, size }),
          disabled && 'opacity-50 cursor-not-allowed bg-neutral-background-disabled',
          className,
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 4.5L6 8L9.5 4.5' stroke='%23616161' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        }}
        {...props}
      />
    );
  },
);

Select.displayName = 'Select';
