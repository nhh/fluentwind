import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import type { CheckboxProps } from './Checkbox.types';

const sizeClasses = {
  medium: { box: 'h-4 w-4', icon: 'text-[10px]', label: 'text-300 leading-300' },
  large: { box: 'h-5 w-5', icon: 'text-[14px]', label: 'text-400 leading-400' },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'medium',
      shape = 'square',
      label,
      labelPosition = 'after',
      disabled,
      className,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const s = sizeClasses[size];

    return (
      <span
        className={cn(
          'inline-flex items-center gap-xs cursor-pointer',
          labelPosition === 'before' && 'flex-row-reverse',
          disabled && 'cursor-not-allowed',
          className,
        )}
      >
        <span className="relative inline-flex items-center justify-center">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            disabled={disabled}
            className={cn(
              'peer appearance-none cursor-pointer border border-neutral-stroke-accessible transition-colors duration-fast',
              s.box,
              shape === 'square' ? 'rounded-small' : 'rounded-circular',
              'checked:bg-brand-background checked:border-brand-background',
              'hover:border-neutral-stroke-accessible-hover',
              'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
              disabled && 'cursor-not-allowed',
            )}
            {...props}
          />
          <svg
            className={cn(
              'absolute pointer-events-none text-neutral-foreground-on-brand opacity-0 peer-checked:opacity-100 transition-opacity duration-fast',
              s.icon,
            )}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 6L5 8.5L9.5 3.5" />
          </svg>
        </span>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-neutral-foreground-1 cursor-pointer select-none',
              s.label,
              disabled && 'text-neutral-foreground-disabled cursor-not-allowed',
            )}
          >
            {label}
          </label>
        )}
      </span>
    );
  },
);

Checkbox.displayName = 'Checkbox';
