import { forwardRef, createContext, useContext, useState, useCallback } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { ToggleGroupProps, ToggleGroupItemProps } from './ToggleGroup.types';

interface ToggleGroupContextValue {
  type: 'single' | 'multiple';
  value: string[];
  toggle: (val: string) => void;
  size: 'small' | 'medium' | 'large';
  appearance: 'subtle' | 'outline';
  disabled: boolean;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  type: 'single',
  value: [],
  toggle: () => {},
  size: 'medium',
  appearance: 'outline',
  disabled: false,
});

function normalizeValue(val: string | string[] | undefined): string[] {
  if (val === undefined) return [];
  return Array.isArray(val) ? val : [val];
}

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      type = 'single',
      value: controlledValue,
      defaultValue,
      onValueChange,
      size = 'medium',
      appearance = 'outline',
      disabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string[]>(normalizeValue(defaultValue));
    const value = controlledValue !== undefined ? normalizeValue(controlledValue) : internalValue;

    const toggle = useCallback(
      (itemValue: string) => {
        let next: string[];
        if (type === 'single') {
          next = value.includes(itemValue) ? [] : [itemValue];
        } else {
          next = value.includes(itemValue)
            ? value.filter((v) => v !== itemValue)
            : [...value, itemValue];
        }
        setInternalValue(next);
        onValueChange?.(type === 'single' ? (next[0] ?? '') : next);
      },
      [type, value, onValueChange],
    );

    return (
      <ToggleGroupContext.Provider value={{ type, value, toggle, size, appearance, disabled }}>
        <div
          ref={ref}
          role="group"
          className={cn('inline-flex', className)}
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  },
);

ToggleGroup.displayName = 'ToggleGroup';

const itemVariants = cva(
  'inline-flex items-center justify-center cursor-pointer transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1 first:rounded-l-medium last:rounded-r-medium [&:not(:first-child):not(:last-child)]:rounded-none',
  {
    variants: {
      size: {
        small: 'text-200 leading-200 px-s py-xxs min-h-6 gap-xxs',
        medium: 'text-300 leading-300 px-m py-xs min-h-8 gap-xs',
        large: 'text-400 leading-400 px-l py-s min-h-10 gap-xs',
      },
      appearance: {
        outline: 'border border-neutral-stroke-1',
        subtle: 'border border-transparent',
      },
      pressed: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        appearance: 'outline',
        pressed: true,
        className: 'bg-brand-background text-neutral-foreground-on-brand border-brand-background',
      },
      {
        appearance: 'outline',
        pressed: false,
        className: 'bg-neutral-background-1 text-neutral-foreground-1 hover:bg-neutral-background-1-hover',
      },
      {
        appearance: 'subtle',
        pressed: true,
        className: 'bg-subtle-background-selected text-neutral-foreground-1',
      },
      {
        appearance: 'subtle',
        pressed: false,
        className: 'bg-transparent text-neutral-foreground-1 hover:bg-subtle-background-hover',
      },
    ],
    defaultVariants: {
      size: 'medium',
      appearance: 'outline',
      pressed: false,
    },
  },
);

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value, icon, disabled: disabledProp, className, children, onClick, ...props }, ref) => {
    const ctx = useContext(ToggleGroupContext);
    const isDisabled = disabledProp || ctx.disabled;
    const isPressed = ctx.value.includes(value);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        ctx.toggle(value);
        onClick?.(e);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isPressed}
        disabled={isDisabled}
        className={cn(
          itemVariants({ size: ctx.size, appearance: ctx.appearance, pressed: isPressed }),
          isDisabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  },
);

ToggleGroupItem.displayName = 'ToggleGroupItem';
