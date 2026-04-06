import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import type { FieldProps } from './Field.types';

const validationColors = {
  none: 'text-neutral-foreground-3',
  success: 'text-status-success-foreground-1',
  warning: 'text-status-warning-foreground-1',
  error: 'text-status-danger-foreground-1',
};

const labelSizes = {
  small: 'text-200 leading-200',
  medium: 'text-300 leading-300',
  large: 'text-400 leading-400',
};

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      label,
      required,
      hint,
      validationMessage,
      validationState = 'none',
      size = 'medium',
      orientation = 'vertical',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-xxs',
          orientation === 'vertical' ? 'flex-col' : 'flex-row items-start gap-m',
          className,
        )}
        {...props}
      >
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-neutral-foreground-1 font-normal cursor-default',
              labelSizes[size],
              orientation === 'horizontal' && 'pt-xs min-w-[120px]',
            )}
          >
            {label}
            {required && <span className="text-status-danger-foreground-1 ml-xxs" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="flex flex-col gap-xxs flex-1">
          {children}
          {validationMessage && (
            <span className={cn('text-200 leading-200', validationColors[validationState])}>
              {validationMessage}
            </span>
          )}
          {hint && !validationMessage && (
            <span className="text-200 leading-200 text-neutral-foreground-3">
              {hint}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Field.displayName = 'Field';
