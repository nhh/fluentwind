import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { TagProps } from './Tag.types';

const tagVariants = cva(
  'inline-flex items-center gap-xs font-normal select-none transition-colors duration-fast',
  {
    variants: {
      appearance: {
        filled: 'bg-neutral-background-3 text-neutral-foreground-1',
        outline: 'bg-transparent text-neutral-foreground-1 border border-neutral-stroke-1',
        brand: 'bg-brand-background text-neutral-foreground-on-brand',
      },
      size: {
        small: 'text-100 leading-100 px-xs py-0.5 min-h-5',
        medium: 'text-200 leading-200 px-s py-xxs min-h-7',
        large: 'text-300 leading-300 px-m py-xs min-h-8',
      },
      shape: {
        rounded: 'rounded-medium',
        circular: 'rounded-circular',
      },
    },
    defaultVariants: {
      appearance: 'filled',
      size: 'medium',
      shape: 'rounded',
    },
  },
);

const DismissIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M4.09 4.22a.75.75 0 0 1 1.06-.04L10 8.94l4.85-4.76a.75.75 0 1 1 1.06 1.06L11.06 10l4.85 4.76a.75.75 0 1 1-1.06 1.06L10 11.06l-4.85 4.76a.75.75 0 0 1-1.06-1.06L8.94 10 4.09 5.24a.75.75 0 0 1-.04-1.06l.04.04Z" />
  </svg>
);

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      appearance,
      size,
      shape,
      dismissible = false,
      onDismiss,
      icon,
      disabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          tagVariants({ appearance, size, shape }),
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
            className={cn(
              'inline-flex items-center justify-center shrink-0 rounded-circular p-0.5 transition-colors duration-fast',
              'hover:bg-neutral-background-1-hover active:bg-neutral-background-1-pressed',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
              disabled && 'pointer-events-none',
            )}
          >
            <DismissIcon />
          </button>
        )}
      </span>
    );
  },
);

Tag.displayName = 'Tag';
