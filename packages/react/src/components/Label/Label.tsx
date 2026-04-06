import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { LabelProps } from './Label.types';

const labelVariants = cva('text-neutral-foreground-1 cursor-default', {
  variants: {
    size: {
      small: 'text-200 leading-200',
      medium: 'text-300 leading-300',
      large: 'text-400 leading-400',
    },
    weight: {
      regular: 'font-normal',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    size: 'medium',
    weight: 'regular',
  },
});

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ size, weight, disabled, required, className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          labelVariants({ size, weight }),
          disabled && 'text-neutral-foreground-disabled',
          className,
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-status-danger-foreground-1 ml-xxs" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = 'Label';
