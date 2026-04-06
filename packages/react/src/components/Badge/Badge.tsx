import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { BadgeProps } from './Badge.types';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-semibold shrink-0',
  {
    variants: {
      size: {
        tiny: 'h-1.5 w-1.5 text-[0px]',
        extraSmall: 'h-3 w-3 text-[0px]',
        small: 'h-4 min-w-4 px-1 text-100 leading-100',
        medium: 'h-5 min-w-5 px-1.5 text-200 leading-200',
        large: 'h-6 min-w-6 px-1.5 text-200 leading-200',
        extraLarge: 'h-8 min-w-8 px-2 text-300 leading-300',
      },
      shape: {
        rounded: 'rounded-medium',
        square: 'rounded-none',
        circular: 'rounded-circular',
      },
    },
    defaultVariants: {
      size: 'medium',
      shape: 'circular',
    },
  },
);

const colorMap: Record<string, Record<string, string>> = {
  filled: {
    brand: 'bg-brand-background text-neutral-foreground-on-brand',
    danger: 'bg-status-danger-background-3 text-status-danger-foreground-3',
    important: 'bg-neutral-foreground-1 text-neutral-background-1',
    informative: 'bg-neutral-background-5 text-neutral-foreground-3',
    severe: 'bg-status-warning-background-3 text-status-warning-foreground-3',
    subtle: 'bg-neutral-background-1 text-neutral-foreground-1',
    success: 'bg-status-success-background-3 text-status-success-foreground-3',
    warning: 'bg-status-warning-background-3 text-status-warning-foreground-3',
  },
  ghost: {
    brand: 'text-brand-foreground-1',
    danger: 'text-status-danger-foreground-1',
    important: 'text-neutral-foreground-1',
    informative: 'text-neutral-foreground-3',
    severe: 'text-status-warning-foreground-1',
    subtle: 'text-neutral-foreground-2',
    success: 'text-status-success-foreground-1',
    warning: 'text-status-warning-foreground-1',
  },
  outline: {
    brand: 'border border-brand-stroke-1 text-brand-foreground-1',
    danger: 'border border-status-danger-stroke-1 text-status-danger-foreground-1',
    important: 'border border-neutral-foreground-1 text-neutral-foreground-1',
    informative: 'border border-neutral-stroke-2 text-neutral-foreground-3',
    severe: 'border border-status-warning-stroke-1 text-status-warning-foreground-1',
    subtle: 'border border-neutral-stroke-1 text-neutral-foreground-2',
    success: 'border border-status-success-stroke-1 text-status-success-foreground-1',
    warning: 'border border-status-warning-stroke-1 text-status-warning-foreground-1',
  },
  tint: {
    brand: 'bg-brand-background-2 text-brand-foreground-2 border border-brand-stroke-2',
    danger: 'bg-status-danger-background-1 text-status-danger-foreground-1 border border-status-danger-stroke-1',
    important: 'bg-neutral-foreground-3 text-neutral-background-1',
    informative: 'bg-neutral-background-4 text-neutral-foreground-3 border border-neutral-stroke-2',
    severe: 'bg-status-warning-background-1 text-status-warning-foreground-1 border border-status-warning-stroke-1',
    subtle: 'bg-neutral-background-3 text-neutral-foreground-2',
    success: 'bg-status-success-background-1 text-status-success-foreground-1 border border-status-success-stroke-1',
    warning: 'bg-status-warning-background-1 text-status-warning-foreground-1 border border-status-warning-stroke-1',
  },
};

export const Badge = forwardRef<HTMLElement, BadgeProps>(
  (
    {
      appearance = 'filled',
      color = 'brand',
      size,
      shape,
      icon,
      iconPosition = 'before',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const colorClass = colorMap[appearance]?.[color] ?? '';

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={cn(badgeVariants({ size, shape }), colorClass, className)}
        {...props}
      >
        {icon && iconPosition === 'before' && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'after' && <span className="shrink-0">{icon}</span>}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
