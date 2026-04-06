import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { DescriptionsProps, DescriptionsItemProps } from './Descriptions.types';

const sizeClasses = {
  small: 'text-200',
  medium: 'text-300',
} as const;

export const DescriptionsItem = forwardRef<HTMLDivElement, DescriptionsItemProps>(
  ({ label, span = 1, children, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('min-w-0', className)}
        style={{ gridColumn: `span ${span}`, ...style }}
        {...props}
      >
        <dt className="font-semibold text-neutral-foreground-2">{label}</dt>
        <dd className="text-neutral-foreground-1 mt-xxs">{children}</dd>
      </div>
    );
  },
);

DescriptionsItem.displayName = 'DescriptionsItem';

export const Descriptions = forwardRef<HTMLDivElement, DescriptionsProps>(
  (
    {
      column = 3,
      bordered = false,
      size = 'medium',
      layout = 'horizontal',
      title,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const gridCols = layout === 'horizontal' ? column * 2 : column;

    return (
      <div ref={ref} className={cn(sizeClasses[size], className)} {...props}>
        {title && (
          <div className="font-semibold text-neutral-foreground-1 text-subtitle-2 mb-s">
            {title}
          </div>
        )}
        <dl
          className={cn(
            'grid gap-s',
            bordered && 'border border-neutral-stroke-2 rounded-medium p-s',
          )}
          style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
        >
          {children}
        </dl>
      </div>
    );
  },
);

Descriptions.displayName = 'Descriptions';
