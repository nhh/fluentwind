import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { InputProps } from './Input.types';

const wrapperVariants = cva(
  'fw-input-underline relative inline-flex items-center gap-xxs transition-colors duration-fast',
  {
    variants: {
      appearance: {
        outline:
          'bg-neutral-background-1 border border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-within:border-neutral-stroke-1',
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

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { appearance, size, contentBefore, contentAfter, disabled, className, ...props },
    ref,
  ) => {
    return (
      <span
        className={cn(
          wrapperVariants({ appearance, size }),
          disabled && 'opacity-50 cursor-not-allowed bg-neutral-background-disabled border-neutral-stroke-disabled',
          className,
        )}
      >
        {contentBefore && (
          <span className="text-neutral-foreground-3 shrink-0">{contentBefore}</span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-neutral-foreground-1 placeholder:text-neutral-foreground-4 disabled:cursor-not-allowed min-w-0"
          {...props}
        />
        {contentAfter && (
          <span className="text-neutral-foreground-3 shrink-0">{contentAfter}</span>
        )}
      </span>
    );
  },
);

Input.displayName = 'Input';
