import { forwardRef, createContext, useContext, useId, useCallback, useState } from 'react';
import { cn } from '../../utils/cn';
import type { RadioGroupProps, RadioProps } from './RadioGroup.types';

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name: nameProp,
      value: controlledValue,
      defaultValue,
      onValueChange,
      layout = 'vertical',
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const generatedName = useId();
    const name = nameProp ?? generatedName;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = controlledValue ?? internalValue;

    const onChange = useCallback(
      (v: string) => {
        if (onValueChange) {
          onValueChange(v);
        } else {
          setInternalValue(v);
        }
      },
      [onValueChange],
    );

    return (
      <RadioGroupContext.Provider value={{ name, value, onChange, disabled }}>
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={layout === 'horizontal' ? 'horizontal' : 'vertical'}
          className={cn(
            'flex gap-s',
            layout === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, label, disabled: disabledProp, className, id: idProp, ...props }, ref) => {
    const group = useContext(RadioGroupContext);
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const disabled = disabledProp || group?.disabled;
    const checked = group?.value === value;

    return (
      <span
        className={cn(
          'inline-flex items-center gap-xs cursor-pointer',
          disabled && 'cursor-not-allowed',
          className,
        )}
      >
        <span className="relative inline-flex items-center justify-center">
          <input
            ref={ref}
            id={id}
            type="radio"
            name={group?.name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={() => group?.onChange(value)}
            className={cn(
              'peer appearance-none cursor-pointer h-4 w-4 rounded-circular border border-neutral-stroke-accessible transition-colors duration-fast',
              'checked:border-brand-background checked:border-[5px]',
              'hover:border-neutral-stroke-accessible-hover',
              'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
              disabled && 'cursor-not-allowed',
            )}
            {...props}
          />
        </span>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-300 leading-300 text-neutral-foreground-1 cursor-pointer select-none',
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

Radio.displayName = 'Radio';
