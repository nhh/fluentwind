import { forwardRef, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { RatingProps } from './Rating.types';

const sizeClasses = {
  small: 'h-4 w-4',
  medium: 'h-5 w-5',
  large: 'h-7 w-7',
  extraLarge: 'h-9 w-9',
};

const colorClasses = {
  brand: 'text-brand-background',
  marigold: 'text-status-warning-foreground-1',
  neutral: 'text-neutral-foreground-1',
};

const emptyColorClasses = {
  brand: 'text-neutral-stroke-1',
  marigold: 'text-neutral-stroke-1',
  neutral: 'text-neutral-stroke-1',
};

const StarFilled = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M9.1 2.9a1 1 0 0 1 1.8 0l1.93 3.92 4.32.63a1 1 0 0 1 .56 1.7L14.57 12l.74 4.3a1 1 0 0 1-1.45 1.05L10 15.27l-3.86 2.03a1 1 0 0 1-1.45-1.05l.74-4.3L2.29 9.16a1 1 0 0 1 .56-1.7l4.32-.64L9.1 2.9Z" />
  </svg>
);

const StarEmpty = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M9.1 2.9a1 1 0 0 1 1.8 0l1.93 3.92 4.32.63a1 1 0 0 1 .56 1.7L14.57 12l.74 4.3a1 1 0 0 1-1.45 1.05L10 15.27l-3.86 2.03a1 1 0 0 1-1.45-1.05l.74-4.3L2.29 9.16a1 1 0 0 1 .56-1.7l4.32-.64L9.1 2.9Zm.9 1.44L8.24 8.07a.5.5 0 0 1-.38.28l-3.82.56 2.77 2.7a.5.5 0 0 1 .14.44l-.65 3.8 3.41-1.8a.5.5 0 0 1 .46 0l3.41 1.8-.65-3.8a.5.5 0 0 1 .14-.44l2.77-2.7-3.82-.56a.5.5 0 0 1-.38-.28L10 4.34Z" />
  </svg>
);

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      max = 5,
      size = 'medium',
      color = 'marigold',
      onChange,
      readOnly = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const value = controlledValue ?? internalValue;
    const displayValue = hoverValue ?? value;

    const handleSelect = useCallback(
      (star: number) => {
        if (readOnly) return;
        if (controlledValue === undefined) {
          setInternalValue(star);
        }
        onChange?.(star);
      },
      [readOnly, controlledValue, onChange],
    );

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Rating"
        className={cn('inline-flex items-center gap-xxs', className)}
        onMouseLeave={() => !readOnly && setHoverValue(null)}
        {...props}
      >
        {Array.from({ length: max }, (_, i) => {
          const star = i + 1;
          const filled = star <= displayValue;

          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={star <= value}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
              disabled={readOnly}
              onClick={() => handleSelect(star)}
              onMouseEnter={() => !readOnly && setHoverValue(star)}
              className={cn(
                'inline-flex items-center justify-center p-0 border-none bg-transparent transition-colors duration-fast cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 rounded-small',
                readOnly && 'cursor-default',
              )}
            >
              {filled ? (
                <StarFilled className={cn(sizeClasses[size], colorClasses[color])} />
              ) : (
                <StarEmpty className={cn(sizeClasses[size], emptyColorClasses[color])} />
              )}
            </button>
          );
        })}
      </div>
    );
  },
);

Rating.displayName = 'Rating';
