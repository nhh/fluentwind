import { forwardRef, useState, useRef, useEffect, useCallback, useMemo, useId } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { TimePickerProps } from './TimePicker.types';

const inputVariants = cva(
  'inline-flex items-center gap-xxs w-full cursor-pointer transition-colors duration-fast outline-none text-neutral-foreground-1 focus-within:ring-2 focus-within:ring-neutral-stroke-focus-2 focus-within:ring-offset-1 focus-within:ring-offset-neutral-stroke-focus-1',
  {
    variants: {
      appearance: {
        outline:
          'bg-neutral-background-1 border border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-within:border-brand-stroke-1',
        underline:
          'bg-transparent-background border-b border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-within:border-brand-stroke-1',
        filledDarker:
          'bg-neutral-background-3 border border-transparent border-b-neutral-stroke-accessible focus-within:border-b-brand-stroke-1',
        filledLighter:
          'bg-neutral-background-1 border border-transparent border-b-neutral-stroke-accessible focus-within:border-b-brand-stroke-1',
      },
      size: {
        small: 'text-200 leading-200 px-s py-xxs min-h-6 rounded-medium',
        medium: 'text-300 leading-300 px-s py-xs min-h-8 rounded-medium',
        large: 'text-400 leading-400 px-m py-s min-h-10 rounded-large',
      },
    },
    defaultVariants: {
      appearance: 'outline',
      size: 'medium',
    },
  },
);

function generateTimeOptions(
  increment: number,
  startHour: number,
  endHour: number,
  hour12: boolean,
): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = [];
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += increment) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      const value24 = `${hh}:${mm}`;

      let label: string;
      if (hour12) {
        const period = h >= 12 ? 'PM' : 'AM';
        const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
        label = `${h12}:${mm} ${period}`;
      } else {
        label = value24;
      }

      options.push({ value: value24, label });
    }
  }
  return options;
}

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-neutral-foreground-3">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8 4V8L10.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      increment = 30,
      startHour = 0,
      endHour = 24,
      disabled = false,
      placeholder = 'Select a time',
      size = 'medium',
      appearance = 'outline',
      hour12 = false,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string | null>(defaultValue ?? null);
    const selected = isControlled ? (value ?? null) : internalValue;

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);

    const listboxId = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const allOptions = useMemo(
      () => generateTimeOptions(increment, startHour, endHour, hour12),
      [increment, startHour, endHour, hour12],
    );

    const filtered = useMemo(() => {
      if (!query) return allOptions;
      const q = query.toLowerCase();
      return allOptions.filter((o) => o.label.toLowerCase().includes(q));
    }, [allOptions, query]);

    const setTime = useCallback(
      (time: string | null) => {
        if (!isControlled) setInternalValue(time);
        onChange?.(time);
      },
      [isControlled, onChange],
    );

    const handleSelect = useCallback(
      (val: string) => {
        setTime(val);
        setQuery('');
        setOpen(false);
        setActiveIndex(-1);
        inputRef.current?.focus();
      },
      [setTime],
    );

    const handleOpen = () => {
      if (disabled) return;
      setOpen(true);
      setQuery('');
      setActiveIndex(-1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setOpen(true);
      setActiveIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!open) {
          handleOpen();
        }
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && filtered[activeIndex]) {
          handleSelect(filtered[activeIndex].value);
        }
      } else if (e.key === 'Escape') {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    // Scroll active option into view
    useEffect(() => {
      if (activeIndex < 0 || !listRef.current) return;
      const activeEl = listRef.current.children[activeIndex] as HTMLElement | undefined;
      activeEl?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex]);

    // Scroll selected option into view when opening
    useEffect(() => {
      if (!open || !listRef.current || !selected) return;
      const idx = allOptions.findIndex((o) => o.value === selected);
      if (idx >= 0) {
        const el = listRef.current.children[idx] as HTMLElement | undefined;
        el?.scrollIntoView({ block: 'center' });
      }
    }, [open, selected, allOptions]);

    // Close on outside click
    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
          setActiveIndex(-1);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    const displayValue = (() => {
      if (open) return query;
      if (!selected) return '';
      const opt = allOptions.find((o) => o.value === selected);
      return opt?.label ?? selected;
    })();

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        {...props}
      >
        <div ref={containerRef}>
          <span
            className={cn(
              inputVariants({ appearance, size }),
              disabled && 'opacity-50 cursor-not-allowed bg-neutral-background-disabled border-neutral-stroke-disabled',
            )}
          >
            <ClockIcon />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
              aria-autocomplete="list"
              disabled={disabled}
              placeholder={placeholder}
              value={displayValue}
              onFocus={handleOpen}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-neutral-foreground-1 placeholder:text-neutral-foreground-4 disabled:cursor-not-allowed min-w-0"
            />
          </span>

          {open && filtered.length > 0 && (
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-label="Time options"
              className="absolute z-50 mt-xxs w-full max-h-60 overflow-auto bg-neutral-background-1 border border-neutral-stroke-1 rounded-medium shadow-16 py-xxs"
            >
              {filtered.map((opt, i) => (
                <li
                  key={opt.value}
                  id={`${listboxId}-${i}`}
                  role="option"
                  aria-selected={opt.value === selected}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(opt.value);
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    'px-s py-xs cursor-pointer text-300 leading-300 text-neutral-foreground-1 transition-colors duration-fast',
                    i === activeIndex && 'bg-neutral-background-1-hover',
                    opt.value === selected && 'bg-brand-background-2 text-brand-foreground-1',
                  )}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
);

TimePicker.displayName = 'TimePicker';
