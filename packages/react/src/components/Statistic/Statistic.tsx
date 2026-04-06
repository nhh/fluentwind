import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { StatisticProps } from './Statistic.types';

const valueVariants = cva('font-semibold text-neutral-foreground-1', {
  variants: {
    size: {
      small: 'text-400 leading-400',
      medium: 'text-600 leading-600',
      large: 'text-800 leading-800',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

function TrendUpIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 2.5l4 4H7.5V9.5h-3V6.5H2l4-4z"
        fill="currentColor"
      />
    </svg>
  );
}

function TrendDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 9.5l4-4H7.5V2.5h-3V5.5H2l4 4z"
        fill="currentColor"
      />
    </svg>
  );
}

function formatValue(value: React.ReactNode, precision?: number): React.ReactNode {
  if (precision !== undefined && typeof value === 'number') {
    return value.toFixed(precision);
  }
  if (precision !== undefined && typeof value === 'string') {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      return num.toFixed(precision);
    }
  }
  return value;
}

export const Statistic = forwardRef<HTMLDivElement, StatisticProps>(
  (
    {
      title,
      value,
      prefix,
      suffix,
      precision,
      trend,
      trendValue,
      size = 'medium',
      className,
      ...props
    },
    ref,
  ) => {
    const formattedValue = formatValue(value, precision);

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-xxs', className)}
        {...props}
      >
        {title && (
          <span className="text-200 leading-200 text-neutral-foreground-2">
            {title}
          </span>
        )}
        <div className="flex items-baseline gap-xs">
          {prefix && (
            <span className={cn(valueVariants({ size }))}>{prefix}</span>
          )}
          <span className={cn(valueVariants({ size }))}>
            {formattedValue}
          </span>
          {suffix && (
            <span className={cn(valueVariants({ size }))}>{suffix}</span>
          )}
        </div>
        {trend && (
          <div
            className={cn(
              'flex items-center gap-xxs text-200 leading-200',
              trend === 'up'
                ? 'text-status-success-foreground-1'
                : 'text-status-danger-foreground-1',
            )}
          >
            {trend === 'up' ? <TrendUpIcon /> : <TrendDownIcon />}
            {trendValue && <span>{trendValue}</span>}
          </div>
        )}
      </div>
    );
  },
);

Statistic.displayName = 'Statistic';
