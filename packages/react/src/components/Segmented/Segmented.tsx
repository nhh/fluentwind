import { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { SegmentedProps } from './Segmented.types';

const containerVariants = cva(
  'inline-flex items-center bg-neutral-background-3 rounded-medium p-xxs',
  {
    variants: {
      size: {
        small: 'gap-xxs',
        medium: 'gap-xxs',
        large: 'gap-xs',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      size: 'medium',
      block: false,
    },
  },
);

const optionVariants = cva(
  'inline-flex items-center justify-center font-semibold cursor-pointer select-none transition-all duration-fast border border-transparent outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 rounded-medium',
  {
    variants: {
      size: {
        small: 'text-200 leading-200 gap-xs px-s py-xxs',
        medium: 'text-300 leading-300 gap-xs px-m py-xs',
        large: 'text-400 leading-400 gap-s px-l py-s',
      },
      selected: {
        true: 'bg-neutral-background-1 text-neutral-foreground-1 shadow-2',
        false: 'bg-transparent text-neutral-foreground-2 hover:bg-subtle-background-hover hover:text-neutral-foreground-1 active:bg-subtle-background-pressed',
      },
      block: {
        true: 'flex-1',
        false: '',
      },
    },
    defaultVariants: {
      size: 'medium',
      selected: false,
      block: false,
    },
  },
);

export const Segmented = forwardRef<HTMLDivElement, SegmentedProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      size = 'medium',
      block = false,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value ?? '');
    const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;

    const containerRefLocal = useRef<HTMLDivElement | null>(null);
    const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

    const handleSelect = useCallback(
      (optionValue: string) => {
        if (disabled) return;
        setInternalValue(optionValue);
        onChange?.(optionValue);
      },
      [disabled, onChange],
    );

    useEffect(() => {
      const container = containerRefLocal.current;
      if (!container) return;
      const selectedBtn = container.querySelector<HTMLElement>('[aria-checked="true"]');
      if (selectedBtn) {
        setIndicator({
          left: selectedBtn.offsetLeft,
          width: selectedBtn.offsetWidth,
        });
      }
    }, [selectedValue]);

    return (
      <div
        ref={(node) => {
          containerRefLocal.current = node;
          if (typeof ref === 'function') ref(node);
        }}
        role="radiogroup"
        className={cn(containerVariants({ size, block }), 'relative', className)}
        {...props}
      >
        {indicator && (
          <span
            className="absolute bg-neutral-background-1 rounded-medium shadow-2 transition-all duration-normal ease-easy-max"
            style={{
              left: indicator.left,
              width: indicator.width,
              top: 'var(--spacing-xxs)',
              bottom: 'var(--spacing-xxs)',
            }}
          />
        )}
        {options.map((option) => {
          const isSelected = option.value === selectedValue;
          const isDisabled = disabled || option.disabled;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isDisabled || undefined}
              disabled={isDisabled}
              onClick={() => handleSelect(option.value)}
              className={cn(
                optionVariants({ size, selected: false, block }),
                'relative z-[1]',
                isSelected && 'text-neutral-foreground-1',
                !isSelected && 'text-neutral-foreground-2',
                isDisabled &&
                  'text-neutral-foreground-disabled cursor-not-allowed hover:bg-transparent',
              )}
            >
              {option.icon && <span className="shrink-0">{option.icon}</span>}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  },
);

Segmented.displayName = 'Segmented';
