import { forwardRef, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { DatePickerProps } from './DatePicker.types';

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

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function defaultFormatDate(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const y = date.getFullYear();
  return `${m}/${d}/${y}`;
}

function defaultParseDate(str: string): Date | null {
  const parts = str.split('/');
  if (parts.length !== 3) return null;
  const month = parseInt(parts[0], 10) - 1;
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if (isNaN(month) || isNaN(day) || isNaN(year)) return null;
  const d = new Date(year, month, day);
  if (d.getFullYear() !== year || d.getMonth() !== month || d.getDate() !== day) return null;
  return d;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getCalendarGrid(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = month === 0 ? getDaysInMonth(year - 1, 11) : getDaysInMonth(year, month - 1);

  const cells: (Date | null)[] = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    cells.push(new Date(prevYear, prevMonth, daysInPrevMonth - i));
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }

  // Next month leading days
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    cells.push(new Date(nextYear, nextMonth, d));
  }

  // Chunk into weeks
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-neutral-foreground-3">
    <path d="M5 1V3M11 1V3M1.5 6H14.5M3 2.5H13C13.8284 2.5 14.5 3.17157 14.5 4V13C14.5 13.8284 13.8284 14.5 13 14.5H3C2.17157 14.5 1.5 13.8284 1.5 13V4C1.5 3.17157 2.17157 2.5 3 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M7.5 2.5L4 6L7.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      disabled = false,
      placeholder = 'Select a date',
      size = 'medium',
      appearance = 'outline',
      formatDate = defaultFormatDate,
      parseDate = defaultParseDate,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null);
    const selected = isControlled ? (value ?? null) : internalValue;

    const [open, setOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [viewDate, setViewDate] = useState(() => selected ?? new Date());

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const today = useMemo(() => {
      const d = new Date();
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }, []);

    const grid = useMemo(
      () => getCalendarGrid(viewDate.getFullYear(), viewDate.getMonth()),
      [viewDate],
    );

    const setDate = useCallback(
      (date: Date | null) => {
        if (!isControlled) setInternalValue(date);
        onChange?.(date);
      },
      [isControlled, onChange],
    );

    const isDateDisabled = useCallback(
      (date: Date): boolean => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return false;
      },
      [minDate, maxDate],
    );

    const handleOpen = () => {
      if (disabled) return;
      setOpen(true);
      setViewDate(selected ?? new Date());
      setInputText(selected ? formatDate(selected) : '');
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleSelectDay = (date: Date) => {
      if (isDateDisabled(date)) return;
      setDate(date);
      setInputText(formatDate(date));
      handleClose();
      inputRef.current?.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setInputText(text);
      const parsed = parseDate(text);
      if (parsed && !isDateDisabled(parsed)) {
        setDate(parsed);
        setViewDate(parsed);
      }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'Enter') {
        if (!open) {
          handleOpen();
        } else {
          const parsed = parseDate(inputText);
          if (parsed && !isDateDisabled(parsed)) {
            handleSelectDay(parsed);
          }
        }
      } else if (e.key === 'ArrowDown' && !open) {
        e.preventDefault();
        handleOpen();
      }
    };

    const navigateMonth = (delta: number) => {
      setViewDate((prev) => {
        const d = new Date(prev);
        d.setMonth(d.getMonth() + delta);
        return d;
      });
    };

    // Close on outside click
    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          handleClose();
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    // Sync input text with controlled value
    useEffect(() => {
      if (!open) {
        setInputText(selected ? formatDate(selected) : '');
      }
    }, [selected, open, formatDate]);

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
            <CalendarIcon />
            <input
              ref={inputRef}
              type="text"
              disabled={disabled}
              placeholder={placeholder}
              value={inputText}
              onChange={handleInputChange}
              onFocus={handleOpen}
              onKeyDown={handleInputKeyDown}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="flex-1 bg-transparent outline-none text-neutral-foreground-1 placeholder:text-neutral-foreground-4 disabled:cursor-not-allowed min-w-0"
            />
          </span>

          {open && (
            <div
              role="dialog"
              aria-label="Date picker"
              className="absolute z-50 mt-xxs bg-neutral-background-1 border border-neutral-stroke-1 rounded-medium shadow-16 p-m"
            >
              {/* Header navigation */}
              <div className="flex items-center justify-between mb-s">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => navigateMonth(-1)}
                  className="p-xs rounded-medium text-neutral-foreground-2 hover:bg-subtle-background-hover focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 outline-none transition-colors duration-fast"
                >
                  <ChevronLeft />
                </button>
                <span className="text-300 leading-300 font-semibold text-neutral-foreground-1">
                  {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                </span>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => navigateMonth(1)}
                  className="p-xs rounded-medium text-neutral-foreground-2 hover:bg-subtle-background-hover focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 outline-none transition-colors duration-fast"
                >
                  <ChevronRight />
                </button>
              </div>

              {/* Calendar grid */}
              <table role="grid" className="border-collapse">
                <thead>
                  <tr>
                    {DAYS.map((day) => (
                      <th
                        key={day}
                        scope="col"
                        className="text-200 leading-200 font-semibold text-neutral-foreground-3 w-8 h-8 text-center"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {grid.map((week, wi) => (
                    <tr key={wi}>
                      {week.map((day, di) => {
                        if (!day) return <td key={di} />;
                        const isCurrentMonth = day.getMonth() === viewDate.getMonth();
                        const isSelected = selected ? isSameDay(day, selected) : false;
                        const isToday = isSameDay(day, today);
                        const isDisabled = isDateDisabled(day);

                        return (
                          <td key={di} className="p-0">
                            <button
                              type="button"
                              disabled={isDisabled}
                              onClick={() => handleSelectDay(day)}
                              aria-label={day.toDateString()}
                              aria-selected={isSelected}
                              className={cn(
                                'w-8 h-8 flex items-center justify-center text-200 leading-200 rounded-medium outline-none transition-colors duration-fast',
                                'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
                                !isCurrentMonth && 'text-neutral-foreground-4',
                                isCurrentMonth && !isSelected && 'text-neutral-foreground-1 hover:bg-subtle-background-hover',
                                isSelected && 'bg-brand-background text-neutral-foreground-on-brand hover:bg-brand-background-hover',
                                isToday && !isSelected && 'font-semibold border border-brand-stroke-1',
                                isDisabled && 'opacity-50 cursor-not-allowed',
                                !isDisabled && 'cursor-pointer',
                              )}
                            >
                              {day.getDate()}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
