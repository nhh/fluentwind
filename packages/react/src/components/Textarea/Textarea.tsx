import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { TextareaProps } from './Textarea.types';

const wrapperVariants = cva(
  'fw-input-underline relative w-full transition-colors duration-fast',
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
        small: 'text-200 leading-200 rounded-medium',
        medium: 'text-300 leading-300 rounded-medium',
        large: 'text-400 leading-400 rounded-large',
      },
    },
    defaultVariants: {
      appearance: 'outline',
      size: 'medium',
    },
  },
);

const resizeClasses = {
  none: 'resize-none',
  both: 'resize',
  horizontal: 'resize-x',
  vertical: 'resize-y',
};

const sizeClasses = {
  small: 'px-s py-xxs',
  medium: 'px-s py-xs',
  large: 'px-m py-s',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ appearance, size = 'medium', resize = 'vertical', disabled, className, ...props }, ref) => {
    return (
      <span
        className={cn(
          wrapperVariants({ appearance, size }),
          disabled && 'opacity-50 cursor-not-allowed bg-neutral-background-disabled',
          className,
        )}
      >
        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full bg-transparent outline-none text-neutral-foreground-1 placeholder:text-neutral-foreground-4 disabled:cursor-not-allowed',
            sizeClasses[size],
            resizeClasses[resize],
          )}
          {...props}
        />
      </span>
    );
  },
);

Textarea.displayName = 'Textarea';
