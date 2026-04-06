import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { SkeletonProps, SkeletonItemProps } from './Skeleton.types';

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-busy="true"
        aria-live="polite"
        className={cn('flex flex-col gap-s', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Skeleton.displayName = 'Skeleton';

export const SkeletonItem = forwardRef<HTMLDivElement, SkeletonItemProps>(
  ({ shape = 'rectangle', size, animation = 'pulse', className, style, ...props }, ref) => {
    const shapeClasses = {
      rectangle: 'w-full h-4 rounded-medium',
      circle: 'rounded-circular',
      square: 'rounded-medium',
    };

    const sizeStyle: React.CSSProperties = {};
    if (size) {
      if (shape === 'circle' || shape === 'square') {
        sizeStyle.width = size;
        sizeStyle.height = size;
      } else {
        sizeStyle.height = size;
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'bg-neutral-background-5',
          shapeClasses[shape],
          animation === 'pulse' && 'animate-pulse',
          animation === 'wave' &&
            'relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-neutral-background-1/40 after:to-transparent after:animate-[shimmer_2s_infinite]',
          className,
        )}
        style={{ ...sizeStyle, ...style }}
        {...props}
      />
    );
  },
);

SkeletonItem.displayName = 'SkeletonItem';
