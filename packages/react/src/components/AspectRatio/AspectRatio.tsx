import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { AspectRatioProps } from './AspectRatio.types';

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, children, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative w-full', className)}
        style={{ paddingBottom: `${(1 / ratio) * 100}%`, ...style }}
        {...props}
      >
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  },
);

AspectRatio.displayName = 'AspectRatio';
