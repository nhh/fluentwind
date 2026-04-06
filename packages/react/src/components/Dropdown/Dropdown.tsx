import { forwardRef, useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { DropdownProps } from './Dropdown.types';

const triggerVariants = cva(
  'inline-flex items-center justify-between w-full cursor-pointer transition-colors duration-fast outline-none text-neutral-foreground-1 focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
  {
    variants: {
      appearance: {
        outline:
          'bg-neutral-background-1 border border-neutral-stroke-1 hover:border-neutral-stroke-1-hover',
        underline:
          'bg-transparent-background border-b border-neutral-stroke-1 hover:border-neutral-stroke-1-hover',
        filledDarker:
          'bg-neutral-background-3 border border-transparent border-b-neutral-stroke-accessible',
        filledLighter:
          'bg-neutral-background-1 border border-transparent border-b-neutral-stroke-accessible',
      },
      size: {
        small: 'text-200 leading-200 px-s py-xxs min-h-6 rounded-medium gap-xs',
        medium: 'text-300 leading-300 px-s py-xs min-h-8 rounded-medium gap-xs',
        large: 'text-400 leading-400 px-m py-s min-h-10 rounded-medium gap-s',
      },
    },
    defaultVariants: {
      appearance: 'outline',
      size: 'medium',
    },
  },
);

const chevronSvg = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className="shrink-0"
  >
    <path
      d="M2.5 4.5L6 8L9.5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select an option',
      size,
      appearance,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerBtnRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((o) => o.value === value);

    const handleSelect = useCallback(
      (optionValue: string) => {
        onChange?.(optionValue);
        setOpen(false);
        setFocusedIndex(-1);
        triggerBtnRef.current?.focus();
      },
      [onChange],
    );

    const handleTriggerKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(true);
          setFocusedIndex(0);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setOpen(false);
        }
      },
      [disabled],
    );

    const handleListboxKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const enabledOptions = options.filter((o) => !o.disabled);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setFocusedIndex((prev) => Math.min(prev + 1, enabledOptions.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < enabledOptions.length) {
            handleSelect(enabledOptions[focusedIndex].value);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setOpen(false);
          setFocusedIndex(-1);
          triggerBtnRef.current?.focus();
        }
      },
      [options, focusedIndex, handleSelect],
    );

    useEffect(() => {
      if (open && listboxRef.current) {
        listboxRef.current.focus();
      }
    }, [open]);

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
        ref={containerRef}
        className={cn('relative inline-block', className)}
        {...props}
      >
        <button
          ref={triggerBtnRef}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={disabled}
          className={cn(
            triggerVariants({ appearance, size }),
            disabled && 'opacity-50 cursor-not-allowed bg-neutral-background-disabled',
          )}
          onClick={() => !disabled && setOpen(!open)}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className={cn(!selectedOption && 'text-neutral-foreground-4')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {chevronSvg}
        </button>
        {open && (
          <div
            ref={listboxRef}
            role="listbox"
            tabIndex={-1}
            onKeyDown={handleListboxKeyDown}
            className="absolute top-full left-0 z-50 mt-xxs w-full min-w-[160px] bg-neutral-background-1 text-neutral-foreground-1 rounded-medium shadow-16 border border-neutral-stroke-1 py-xs outline-none"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                disabled={option.disabled}
                className={cn(
                  'flex items-center w-full text-left px-m py-s text-300 leading-300 transition-colors duration-fast cursor-pointer outline-none',
                  'hover:bg-subtle-background-hover focus-visible:bg-subtle-background-hover',
                  'active:bg-subtle-background-pressed',
                  option.value === value && 'bg-subtle-background-selected',
                  option.disabled && 'opacity-50 cursor-not-allowed',
                )}
                onClick={() => !option.disabled && handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';
