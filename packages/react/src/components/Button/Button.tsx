import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { ButtonProps } from './Button.types';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold font-base transition-colors duration-fast cursor-pointer select-none border border-transparent outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
  {
    variants: {
      appearance: {
        secondary:
          'bg-neutral-background-1 text-neutral-foreground-1 border-neutral-stroke-1 hover:bg-neutral-background-1-hover hover:border-neutral-stroke-1-hover active:bg-neutral-background-1-pressed active:border-neutral-stroke-1-pressed',
        primary:
          'bg-brand-background text-neutral-foreground-on-brand hover:bg-brand-background-hover active:bg-brand-background-pressed',
        outline:
          'bg-transparent-background text-neutral-foreground-1 border-neutral-stroke-accessible hover:bg-subtle-background-hover hover:border-neutral-stroke-accessible-hover active:bg-subtle-background-pressed active:border-neutral-stroke-accessible-pressed',
        subtle:
          'bg-subtle-background text-neutral-foreground-1 hover:bg-subtle-background-hover active:bg-subtle-background-pressed',
        transparent:
          'bg-transparent-background text-brand-foreground-1 hover:bg-transparent-background-hover active:bg-transparent-background-pressed',
      },
      size: {
        small: 'text-200 leading-200 gap-xs px-s py-xxs min-h-6',
        medium: 'text-300 leading-300 gap-xs px-m py-xs min-h-8',
        large: 'text-400 leading-400 gap-s px-l py-s min-h-10',
      },
      shape: {
        rounded: '',
        circular: 'rounded-circular',
        square: 'rounded-none',
      },
      iconOnly: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Rounded shape sizes
      { shape: 'rounded', size: 'small', className: 'rounded-medium' },
      { shape: 'rounded', size: 'medium', className: 'rounded-medium' },
      { shape: 'rounded', size: 'large', className: 'rounded-large' },
      // Icon-only padding overrides
      { iconOnly: true, size: 'small', className: 'px-xxs' },
      { iconOnly: true, size: 'medium', className: 'px-xs' },
      { iconOnly: true, size: 'large', className: 'px-xs' },
    ],
    defaultVariants: {
      appearance: 'secondary',
      size: 'medium',
      shape: 'rounded',
      iconOnly: false,
    },
  },
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      appearance,
      size,
      shape,
      icon,
      iconPosition = 'before',
      iconOnly = false,
      disabled,
      disabledFocusable,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || disabledFocusable;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-disabled={disabledFocusable || undefined}
        className={cn(
          buttonVariants({ appearance, size, shape, iconOnly }),
          isDisabled && 'bg-neutral-background-disabled text-neutral-foreground-disabled border-neutral-stroke-disabled cursor-not-allowed',
          className,
        )}
        {...props}
      >
        {icon && iconPosition === 'before' && <span className="shrink-0">{icon}</span>}
        {!iconOnly && children}
        {icon && iconPosition === 'after' && <span className="shrink-0">{icon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
