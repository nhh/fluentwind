import { forwardRef, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { SpinButtonProps } from './SpinButton.types';

const appearanceClasses = {
  outline: 'bg-neutral-background-1 border border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-within:border-brand-stroke-1',
  underline: 'bg-transparent-background border-b border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-within:border-brand-stroke-1',
  filledDarker: 'bg-neutral-background-3 border border-transparent border-b-neutral-stroke-accessible focus-within:border-b-brand-stroke-1',
  filledLighter: 'bg-neutral-background-1 border border-transparent border-b-neutral-stroke-accessible focus-within:border-b-brand-stroke-1',
};

const sizeClasses = {
  small: 'text-200 leading-200 min-h-6 rounded-medium',
  medium: 'text-300 leading-300 min-h-8 rounded-medium',
};

export const SpinButton = forwardRef<HTMLInputElement, SpinButtonProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      onChange,
      min = -Infinity,
      max = Infinity,
      step = 1,
      size = 'medium',
      appearance = 'outline',
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = controlledValue ?? internalValue;

    const setValue = useCallback(
      (v: number) => {
        const clamped = Math.min(max, Math.max(min, v));
        if (onChange) onChange(clamped);
        else setInternalValue(clamped);
      },
      [onChange, min, max],
    );

    const btnClass = 'px-xxs text-neutral-foreground-3 hover:text-neutral-foreground-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    return (
      <span
        className={cn(
          'inline-flex items-center gap-0 transition-colors duration-fast focus-within:ring-2 focus-within:ring-neutral-stroke-focus-2 focus-within:ring-offset-1 focus-within:ring-offset-neutral-stroke-focus-1',
          appearanceClasses[appearance],
          sizeClasses[size],
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        <button type="button" tabIndex={-1} disabled={disabled || value <= min} onClick={() => setValue(value - step)} className={cn(btnClass, 'pl-s')} aria-label="Decrease">
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          role="spinbutton"
          aria-valuenow={value}
          aria-valuemin={min !== -Infinity ? min : undefined}
          aria-valuemax={max !== Infinity ? max : undefined}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isNaN(n)) setValue(n);
          }}
          className="w-12 text-center bg-transparent outline-none text-neutral-foreground-1 disabled:cursor-not-allowed"
          {...props}
        />
        <button type="button" tabIndex={-1} disabled={disabled || value >= max} onClick={() => setValue(value + step)} className={cn(btnClass, 'pr-s')} aria-label="Increase">
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </span>
    );
  },
);

SpinButton.displayName = 'SpinButton';
