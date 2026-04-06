import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { TextareaProps } from './Textarea.types';

const textareaVariants = cva(
  'fw-input-underline w-full text-neutral-foreground-1 placeholder:text-neutral-foreground-4 outline-none transition-colors duration-fast',
  {
    variants: {
      appearance: {
        outline:
          'bg-neutral-background-1 border border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-visible:border-neutral-stroke-1',
        underline:
          'bg-transparent-background border-b border-neutral-stroke-1 hover:border-neutral-stroke-1-hover',
        filledDarker:
          'bg-neutral-background-3 border border-transparent border-b-neutral-stroke-accessible',
        filledLighter:
          'bg-neutral-background-1 border border-transparent border-b-neutral-stroke-accessible',
      },
      size: {
        small: 'text-200 leading-200 px-s py-xxs rounded-medium',
        medium: 'text-300 leading-300 px-s py-xs rounded-medium',
        large: 'text-400 leading-400 px-m py-s rounded-large',
      },
      resize: {
        none: 'resize-none',
        both: 'resize',
        horizontal: 'resize-x',
        vertical: 'resize-y',
      },
    },
    defaultVariants: {
      appearance: 'outline',
      size: 'medium',
      resize: 'vertical',
    },
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ appearance, size, resize, disabled, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          textareaVariants({ appearance, size, resize }),
          disabled && 'opacity-50 cursor-not-allowed bg-neutral-background-disabled',
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
