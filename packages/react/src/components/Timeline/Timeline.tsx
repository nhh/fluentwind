import { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { cn } from '../../utils/cn';
import type { TimelineProps, TimelineItemProps } from './Timeline.types';

const dotColorMap: Record<NonNullable<TimelineItemProps['color']>, string> = {
  brand: 'bg-brand-background',
  success: 'bg-status-success-background-3',
  warning: 'bg-status-warning-background-3',
  danger: 'bg-status-danger-background-3',
  neutral: 'bg-neutral-foreground-3',
};

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ mode = 'left', className, children, ...props }, ref) => {
    const items = Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn('flex flex-col', className)}
        {...props}
      >
        {items.map((child, index) => {
          if (isValidElement<TimelineItemProps & { _mode?: string; _index?: number; _isLast?: boolean }>(child)) {
            return cloneElement(child, {
              _mode: mode,
              _index: index,
              _isLast: index === items.length - 1,
            });
          }
          return child;
        })}
      </div>
    );
  },
);

Timeline.displayName = 'Timeline';

export const TimelineItem = forwardRef<
  HTMLDivElement,
  TimelineItemProps & { _mode?: string; _index?: number; _isLast?: boolean }
>(
  (
    {
      dot,
      color = 'brand',
      label,
      _mode = 'left',
      _index = 0,
      _isLast = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isRight =
      _mode === 'right' || (_mode === 'alternate' && _index % 2 === 1);

    const dotElement = dot ?? (
      <span
        className={cn(
          'block h-3 w-3 rounded-circular border-2 border-neutral-background-1 shrink-0',
          dotColorMap[color],
        )}
      />
    );

    const lineElement = !_isLast ? (
      <div className="w-px flex-1 bg-neutral-stroke-2" />
    ) : null;

    const contentSide = (
      <div
        className={cn(
          'flex-1 pb-l',
          isRight ? 'text-right' : 'text-left',
        )}
      >
        <div className="text-300 leading-300 text-neutral-foreground-1">
          {children}
        </div>
      </div>
    );

    const labelSide = (
      <div
        className={cn(
          'flex-1 pb-l',
          isRight ? 'text-left' : 'text-right',
        )}
      >
        {label && (
          <span className="text-200 leading-200 text-neutral-foreground-2">
            {label}
          </span>
        )}
      </div>
    );

    // Single-side modes (left or right)
    if (_mode !== 'alternate') {
      return (
        <div
          ref={ref}
          className={cn('flex gap-m', className)}
          {...props}
        >
          {_mode === 'right' && (
            <div className={cn('flex-1 pb-l text-right')}>
              <div className="text-300 leading-300 text-neutral-foreground-1">
                {children}
              </div>
            </div>
          )}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center py-xxs">
              {dotElement}
            </div>
            {lineElement}
          </div>
          {_mode === 'left' && (
            <div className={cn('flex-1 pb-l text-left')}>
              <div className="text-300 leading-300 text-neutral-foreground-1">
                {children}
              </div>
              {label && (
                <span className="text-200 leading-200 text-neutral-foreground-2">
                  {label}
                </span>
              )}
            </div>
          )}
          {_mode === 'right' && label && (
            <div className={cn('flex-1 pb-l text-left')}>
              <span className="text-200 leading-200 text-neutral-foreground-2">
                {label}
              </span>
            </div>
          )}
        </div>
      );
    }

    // Alternate mode
    return (
      <div
        ref={ref}
        className={cn('flex gap-m', className)}
        {...props}
      >
        {isRight ? labelSide : contentSide}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center py-xxs">
            {dotElement}
          </div>
          {lineElement}
        </div>
        {isRight ? contentSide : labelSide}
      </div>
    );
  },
);

TimelineItem.displayName = 'TimelineItem';
