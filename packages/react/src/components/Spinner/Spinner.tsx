import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { SpinnerProps } from './Spinner.types';

const sizeClasses: Record<NonNullable<SpinnerProps['size']>, string> = {
  tiny: 'h-5 w-5 border-[1.5px]',
  extraSmall: 'h-5 w-5 border-[1.5px]',
  small: 'h-6 w-6 border-2',
  medium: 'h-8 w-8 border-2',
  large: 'h-9 w-9 border-[3px]',
  extraLarge: 'h-10 w-10 border-[3px]',
  huge: 'h-14 w-14 border-4',
};

const labelSizeClasses: Record<NonNullable<SpinnerProps['size']>, string> = {
  tiny: 'text-200 leading-200',
  extraSmall: 'text-200 leading-200',
  small: 'text-200 leading-200',
  medium: 'text-300 leading-300',
  large: 'text-300 leading-300',
  extraLarge: 'text-400 leading-400',
  huge: 'text-400 leading-400',
};

const layoutClasses: Record<NonNullable<SpinnerProps['labelPosition']>, string> = {
  above: 'flex-col-reverse items-center gap-xs',
  below: 'flex-col items-center gap-xs',
  before: 'flex-row-reverse items-center gap-s',
  after: 'flex-row items-center gap-s',
};

export const Spinner = forwardRef<HTMLElement, SpinnerProps>(
  (
    {
      size = 'medium',
      appearance = 'primary',
      label,
      labelPosition = 'after',
      className,
      ...props
    },
    ref,
  ) => {
    const trackColor =
      appearance === 'inverted'
        ? 'border-neutral-background-inverted/20'
        : 'border-neutral-stroke-1';
    const arcColor =
      appearance === 'inverted'
        ? 'border-t-neutral-foreground-inverted'
        : 'border-t-brand-background';

    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        role="progressbar"
        aria-busy="true"
        aria-label={label || 'Loading'}
        className={cn('inline-flex', layoutClasses[labelPosition], className)}
        {...props}
      >
        <span
          className={cn(
            'rounded-circular animate-spin',
            sizeClasses[size],
            trackColor,
            arcColor,
          )}
        />
        {label && (
          <span className={cn('text-neutral-foreground-1', labelSizeClasses[size])}>
            {label}
          </span>
        )}
      </span>
    );
  },
);

Spinner.displayName = 'Spinner';
