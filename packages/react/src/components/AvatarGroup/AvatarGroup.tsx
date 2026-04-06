import { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { cn } from '../../utils/cn';
import type { AvatarGroupProps } from './AvatarGroup.types';

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      size,
      layout = 'stack',
      maxAvatars,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const childArray = Children.toArray(children).filter(isValidElement);
    const visibleCount = maxAvatars ?? childArray.length;
    const visible = childArray.slice(0, visibleCount);
    const overflowCount = childArray.length - visibleCount;

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'inline-flex items-center',
          layout === 'stack' && '-space-x-2',
          layout === 'spread' && 'gap-xs',
          className,
        )}
        {...props}
      >
        {visible.map((child, i) => {
          if (isValidElement(child) && size) {
            return cloneElement(child as React.ReactElement<{ size?: number }>, {
              key: i,
              size,
            });
          }
          return child;
        })}
        {overflowCount > 0 && (
          <span
            className={cn(
              'inline-flex items-center justify-center shrink-0 rounded-circular bg-neutral-background-5 text-neutral-foreground-3 font-semibold text-200',
              !size && 'h-8 w-8',
              layout === 'stack' && 'ring-2 ring-neutral-background-1',
            )}
            style={size ? { width: size, height: size } : undefined}
          >
            +{overflowCount}
          </span>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
