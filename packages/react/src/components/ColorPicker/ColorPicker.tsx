import { forwardRef, useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { ColorPickerProps } from './ColorPicker.types';

const DEFAULT_PRESET_COLORS = [
  '#0078D4',
  '#00B7C3',
  '#038387',
  '#498205',
  '#8764B8',
  '#CA5010',
  '#DA3B01',
  '#D13438',
  '#C239B3',
  '#881798',
  '#4A5459',
  '#69797E',
  '#7A7574',
  '#57811B',
];

const triggerVariants = cva(
  'inline-flex items-center justify-center rounded-circular border border-neutral-stroke-1 cursor-pointer transition-all duration-fast outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
  {
    variants: {
      size: {
        small: 'h-6 w-6',
        medium: 'h-8 w-8',
        large: 'h-10 w-10',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

const swatchVariants = cva(
  'inline-flex items-center justify-center rounded-circular cursor-pointer transition-all duration-fast outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
  {
    variants: {
      size: {
        small: 'h-5 w-5',
        medium: 'h-6 w-6',
        large: 'h-8 w-8',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value,
      defaultValue = '#0078D4',
      onChange,
      presetColors = DEFAULT_PRESET_COLORS,
      showInput = true,
      disabled = false,
      size = 'medium',
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalColor, setInternalColor] = useState(defaultValue);
    const currentColor = isControlled ? value : internalColor;

    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(currentColor);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleColorChange = useCallback(
      (color: string) => {
        if (!isControlled) {
          setInternalColor(color);
        }
        setInputValue(color);
        onChange?.(color);
      },
      [isControlled, onChange],
    );

    const handleInputChange = useCallback(
      (val: string) => {
        setInputValue(val);
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
          handleColorChange(val);
        }
      },
      [handleColorChange],
    );

    const handleInputKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          if (/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
            handleColorChange(inputValue);
            setOpen(false);
          }
        } else if (e.key === 'Escape') {
          setOpen(false);
        }
      },
      [inputValue, handleColorChange],
    );

    // Sync inputValue when controlled value changes
    useEffect(() => {
      if (isControlled) {
        setInputValue(value);
      }
    }, [isControlled, value]);

    // Close on outside click
    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        {...props}
      >
        <div ref={containerRef} className="relative inline-block">
          <button
            type="button"
            disabled={disabled}
            aria-label={`Color picker, current color: ${currentColor}`}
            aria-expanded={open}
            aria-haspopup="dialog"
            className={cn(
              triggerVariants({ size }),
              disabled && 'opacity-50 cursor-not-allowed',
            )}
            onClick={() => !disabled && setOpen(!open)}
          >
            <span
              className={cn(
                'rounded-circular block',
                size === 'small' && 'h-4 w-4',
                size === 'medium' && 'h-5 w-5',
                size === 'large' && 'h-7 w-7',
              )}
              style={{ backgroundColor: currentColor }}
            />
          </button>

          {open && (
            <div
              role="dialog"
              aria-label="Color picker"
              className="absolute top-full left-0 z-50 mt-xxs bg-neutral-background-1 rounded-medium shadow-8 border border-neutral-stroke-1 p-m"
            >
              <div
                role="grid"
                aria-label="Preset colors"
                className="grid grid-cols-7 gap-xs"
              >
                {presetColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Select color ${color}`}
                    aria-selected={currentColor.toUpperCase() === color.toUpperCase()}
                    className={cn(
                      swatchVariants({ size }),
                      currentColor.toUpperCase() === color.toUpperCase() &&
                        'ring-2 ring-neutral-stroke-focus-2 ring-offset-1 ring-offset-neutral-stroke-focus-1',
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>

              {showInput && (
                <div className="mt-m flex items-center gap-xs">
                  <span
                    className="h-6 w-6 rounded-circular border border-neutral-stroke-1 shrink-0"
                    style={{ backgroundColor: currentColor }}
                  />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    maxLength={7}
                    className={cn(
                      'flex-1 text-200 leading-200 px-s py-xxs rounded-medium',
                      'bg-neutral-background-1 text-neutral-foreground-1',
                      'border border-neutral-stroke-1',
                      'outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
                      'font-mono',
                    )}
                    aria-label="Hex color value"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

ColorPicker.displayName = 'ColorPicker';
