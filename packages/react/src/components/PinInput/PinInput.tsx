import { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { PinInputProps } from './PinInput.types';

const inputVariants = cva(
  'text-center border border-neutral-stroke-1 bg-neutral-background-1 text-neutral-foreground-1 rounded-medium outline-none transition-colors duration-fast focus:border-brand-stroke-1 focus:ring-2 focus:ring-neutral-stroke-focus-2 focus:ring-offset-1 focus:ring-offset-neutral-stroke-focus-1 placeholder:text-neutral-foreground-4',
  {
    variants: {
      size: {
        small: 'w-8 h-8 text-200 leading-200',
        medium: 'w-10 h-10 text-300 leading-300',
        large: 'w-12 h-12 text-400 leading-400',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
  (
    {
      length = 4,
      value: controlledValue,
      defaultValue = '',
      onChange,
      onComplete,
      mask = false,
      disabled = false,
      size = 'medium',
      placeholder,
      className,
      ...props
    },
    ref,
  ) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [internalValue, setInternalValue] = useState(defaultValue.padEnd(length, ' ').slice(0, length).split('').map((c) => (c === ' ' ? '' : c)));

    const chars = controlledValue !== undefined
      ? controlledValue.padEnd(length, ' ').slice(0, length).split('').map((c) => (c === ' ' ? '' : c))
      : internalValue;

    const updateValue = useCallback(
      (newChars: string[]) => {
        setInternalValue(newChars);
        const joined = newChars.join('');
        onChange?.(joined.replace(/ /g, ''));
        if (newChars.every((c) => c !== '') && newChars.length === length) {
          onComplete?.(joined);
        }
      },
      [onChange, onComplete, length],
    );

    const handleInput = useCallback(
      (index: number, inputValue: string) => {
        const char = inputValue.slice(-1);
        const newChars = [...chars];
        newChars[index] = char;
        updateValue(newChars);
        if (char && index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      },
      [chars, updateValue, length],
    );

    const handleKeyDown = useCallback(
      (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
          e.preventDefault();
          const newChars = [...chars];
          if (chars[index]) {
            newChars[index] = '';
            updateValue(newChars);
          } else if (index > 0) {
            newChars[index - 1] = '';
            updateValue(newChars);
            inputRefs.current[index - 1]?.focus();
          }
        } else if (e.key === 'ArrowLeft' && index > 0) {
          e.preventDefault();
          inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < length - 1) {
          e.preventDefault();
          inputRefs.current[index + 1]?.focus();
        }
      },
      [chars, updateValue, length],
    );

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').slice(0, length);
        const newChars = [...chars];
        for (let i = 0; i < pasted.length; i++) {
          newChars[i] = pasted[i];
        }
        updateValue(newChars);
        const focusIndex = Math.min(pasted.length, length - 1);
        inputRefs.current[focusIndex]?.focus();
      },
      [chars, updateValue, length],
    );

    return (
      <div
        ref={ref}
        role="group"
        aria-label="PIN input"
        className={cn('inline-flex gap-xs', className)}
        {...props}
      >
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type={mask ? 'password' : 'text'}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            disabled={disabled}
            placeholder={placeholder}
            value={chars[i] || ''}
            onChange={(e) => handleInput(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            onFocus={(e) => e.target.select()}
            className={cn(
              inputVariants({ size }),
              disabled && 'opacity-50 cursor-not-allowed bg-neutral-background-disabled border-neutral-stroke-disabled',
            )}
          />
        ))}
      </div>
    );
  },
);

PinInput.displayName = 'PinInput';
