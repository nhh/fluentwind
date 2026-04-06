import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import type { SwitchProps } from './Switch.types';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, labelPosition = 'after', disabled, className, id: idProp, ...props }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const isAbove = labelPosition === 'above';

    return (
      <span
        className={cn(
          'inline-flex items-center gap-s cursor-pointer',
          isAbove && 'flex-col items-start gap-xxs',
          labelPosition === 'before' && !isAbove && 'flex-row-reverse',
          disabled && 'cursor-not-allowed',
          className,
        )}
      >
        <span className="relative inline-flex items-center">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            aria-checked={props.checked ?? undefined}
            disabled={disabled}
            className={cn(
              'peer appearance-none cursor-pointer w-10 h-5 rounded-circular border border-neutral-stroke-accessible transition-colors duration-fast',
              'bg-transparent-background',
              'checked:bg-brand-background checked:border-brand-background',
              'hover:border-neutral-stroke-accessible-hover',
              'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
              disabled && 'cursor-not-allowed',
            )}
            {...props}
          />
          <span
            className={cn(
              'absolute pointer-events-none w-3.5 h-3.5 rounded-circular bg-neutral-stroke-accessible transition-all duration-fast',
              'left-[3px] peer-checked:left-[23px]',
              'peer-checked:bg-neutral-foreground-inverted',
            )}
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

Switch.displayName = 'Switch';
