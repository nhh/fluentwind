import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ProgressBarProps } from './ProgressBar.types';

const barColors = {
  brand: 'bg-brand-background',
  success: 'bg-status-success-background-3',
  warning: 'bg-status-warning-background-3',
  error: 'bg-status-danger-background-3',
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 1,
      thickness = 'medium',
      color = 'brand',
      shape = 'rounded',
      className,
      ...props
    },
    ref,
  ) => {
    const isIndeterminate = value === undefined;
    const percent = isIndeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
    const h = thickness === 'large' ? 'h-1' : 'h-0.5';
    const r = shape === 'rounded' ? 'rounded-circular' : '';

    return (
      <>
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn('w-full overflow-hidden', h, r, 'bg-neutral-stroke-1', className)}
          {...props}
        >
          <div
            className={cn(
              'h-full transition-all duration-normal ease-easy-max',
              r,
              barColors[color],
              isIndeterminate && 'w-1/3',
            )}
            style={isIndeterminate ? { animation: 'fw-indeterminate 1.5s var(--ease-easy) infinite' } : { width: `${percent}%` }}
          />
        </div>
      </>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
