import { forwardRef, useState, useRef, useId, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { ComboboxProps } from './Combobox.types';

const appearanceClasses = {
  outline: 'bg-neutral-background-1 border border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-within:border-brand-stroke-1',
  underline: 'bg-transparent-background border-b border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-within:border-brand-stroke-1',
  filledDarker: 'bg-neutral-background-3 border border-transparent border-b-neutral-stroke-accessible focus-within:border-b-brand-stroke-1',
  filledLighter: 'bg-neutral-background-1 border border-transparent border-b-neutral-stroke-accessible focus-within:border-b-brand-stroke-1',
};

const sizeClasses = {
  small: 'text-200 leading-200 px-s py-xxs min-h-6 rounded-medium',
  medium: 'text-300 leading-300 px-s py-xs min-h-8 rounded-medium',
  large: 'text-400 leading-400 px-m py-s min-h-10 rounded-large',
};

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      options,
      value,
      onChange,
      size = 'medium',
      appearance = 'outline',
      placeholder,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const listboxId = useId();
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((o) => o.value === value);
    const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, []);

    const select = useCallback(
      (val: string) => {
        onChange?.(val);
        setQuery('');
        setOpen(false);
        setActiveIndex(-1);
      },
      [onChange],
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && activeIndex >= 0 && filtered[activeIndex]) {
        e.preventDefault();
        select(filtered[activeIndex].value);
      } else if (e.key === 'Escape') {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    return (
      <div ref={wrapperRef} className={cn('relative inline-block', className)}>
        <span className={cn('inline-flex items-center gap-xxs w-full transition-colors duration-fast focus-within:ring-2 focus-within:ring-neutral-stroke-focus-2 focus-within:ring-offset-1 focus-within:ring-offset-neutral-stroke-focus-1', appearanceClasses[appearance], sizeClasses[size], disabled && 'opacity-50 cursor-not-allowed')}>
          <input
            ref={ref}
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
            disabled={disabled}
            placeholder={placeholder}
            value={open ? query : selectedOption?.label ?? ''}
            onFocus={() => { setOpen(true); setQuery(''); }}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIndex(-1); }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-neutral-foreground-1 placeholder:text-neutral-foreground-4 disabled:cursor-not-allowed min-w-0"
            {...props}
          />
          <svg className="shrink-0 text-neutral-foreground-3" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {open && filtered.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            className="absolute z-50 mt-xxs w-full max-h-60 overflow-auto bg-neutral-background-1 border border-neutral-stroke-1 rounded-medium shadow-16 py-xxs"
          >
            {filtered.map((opt, i) => (
              <li
                key={opt.value}
                id={`${listboxId}-${i}`}
                role="option"
                aria-selected={opt.value === value}
                aria-disabled={opt.disabled}
                onMouseDown={(e) => { e.preventDefault(); if (!opt.disabled) select(opt.value); }}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  'px-s py-xs cursor-pointer text-300 leading-300 text-neutral-foreground-1',
                  i === activeIndex && 'bg-neutral-background-1-hover',
                  opt.value === value && 'bg-brand-background-2 text-brand-foreground-1',
                  opt.disabled && 'opacity-50 cursor-not-allowed',
                )}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

Combobox.displayName = 'Combobox';
