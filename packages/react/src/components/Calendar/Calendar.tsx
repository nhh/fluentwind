import { forwardRef, useState, useCallback, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { CalendarProps } from './Calendar.types';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getCalendarGrid(year: number, month: number): Date[][] {
  // Monday-based week: Monday=0 ... Sunday=6
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth =
    month === 0 ? getDaysInMonth(year - 1, 11) : getDaysInMonth(year, month - 1);

  const cells: Date[] = [];

  // Previous month trailing days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
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

  const weeks: Date[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

const ChevronLeft = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M7.5 2.5L4 6L7.5 9.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M4.5 2.5L8 6L4.5 9.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      mode = 'month',
      dateCellRender,
      disabledDate,
      minDate,
      maxDate,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null);
    const selected = isControlled ? (value ?? null) : internalValue;

    const [viewDate, setViewDate] = useState<Date>(() => selected ?? new Date());
    const [viewMode, setViewMode] = useState<'month' | 'year'>(mode);

    const today = useMemo(() => {
      const d = new Date();
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }, []);

    const grid = useMemo(
      () => getCalendarGrid(viewDate.getFullYear(), viewDate.getMonth()),
      [viewDate],
    );

    const isDateDisabled = useCallback(
      (date: Date): boolean => {
        if (disabledDate?.(date)) return true;
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return false;
      },
      [disabledDate, minDate, maxDate],
    );

    const handleSelect = useCallback(
      (date: Date) => {
        if (isDateDisabled(date)) return;
        if (!isControlled) setInternalValue(date);
        onChange?.(date);
      },
      [isControlled, isDateDisabled, onChange],
    );

    const navigateMonth = (delta: number) => {
      setViewDate((prev) => {
        const d = new Date(prev);
        d.setMonth(d.getMonth() + delta);
        return d;
      });
    };

    const navigateYear = (delta: number) => {
      setViewDate((prev) => {
        const d = new Date(prev);
        d.setFullYear(d.getFullYear() + delta);
        return d;
      });
    };

    const handleMonthSelect = (monthIndex: number) => {
      setViewDate((prev) => new Date(prev.getFullYear(), monthIndex, 1));
      setViewMode('month');
    };

    const handleHeaderClick = () => {
      setViewMode((prev) => (prev === 'month' ? 'year' : 'month'));
    };

    return (
      <div
        ref={ref}
        className={cn('w-full bg-neutral-background-1 rounded-medium', className)}
        {...props}
      >
        {/* Header navigation */}
        <div className="flex items-center justify-between mb-s">
          <button
            type="button"
            aria-label={viewMode === 'month' ? 'Previous month' : 'Previous year'}
            onClick={() => (viewMode === 'month' ? navigateMonth(-1) : navigateYear(-1))}
            className="p-xs rounded-medium text-neutral-foreground-2 hover:bg-subtle-background-hover focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 outline-none transition-colors duration-fast"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={handleHeaderClick}
            aria-live="polite"
            className="text-300 leading-300 font-semibold text-neutral-foreground-1 hover:bg-subtle-background-hover px-s py-xxs rounded-medium outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 transition-colors duration-fast cursor-pointer"
          >
            {viewMode === 'month'
              ? `${MONTHS[viewDate.getMonth()]} ${viewDate.getFullYear()}`
              : `${viewDate.getFullYear()}`}
          </button>
          <button
            type="button"
            aria-label={viewMode === 'month' ? 'Next month' : 'Next year'}
            onClick={() => (viewMode === 'month' ? navigateMonth(1) : navigateYear(1))}
            className="p-xs rounded-medium text-neutral-foreground-2 hover:bg-subtle-background-hover focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 outline-none transition-colors duration-fast"
          >
            <ChevronRight />
          </button>
        </div>

        {viewMode === 'month' ? (
          /* Month grid */
          <table role="grid" className="w-full border-collapse">
            <thead>
              <tr>
                {DAYS.map((day) => (
                  <th
                    key={day}
                    scope="col"
                    className="text-200 leading-200 font-semibold text-neutral-foreground-3 py-xs text-center"
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
                    const isCurrentMonth = day.getMonth() === viewDate.getMonth();
                    const isSelected = selected ? isSameDay(day, selected) : false;
                    const isToday = isSameDay(day, today);
                    const isDisabled = isDateDisabled(day);

                    return (
                      <td key={di} className="p-0 text-center">
                        <button
                          type="button"
                          disabled={isDisabled}
                          onClick={() => handleSelect(day)}
                          aria-label={day.toDateString()}
                          aria-selected={isSelected}
                          className={cn(
                            'w-full py-s text-center text-200 leading-200 rounded-medium outline-none transition-colors duration-fast cursor-pointer',
                            'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
                            !isCurrentMonth && 'text-neutral-foreground-4',
                            isCurrentMonth &&
                              !isSelected &&
                              'text-neutral-foreground-1 hover:bg-subtle-background-hover',
                            isSelected &&
                              'bg-brand-background text-neutral-foreground-on-brand hover:bg-brand-background-hover',
                            isToday &&
                              !isSelected &&
                              'ring-1 ring-brand-stroke-1',
                            isDisabled && 'opacity-50 cursor-not-allowed',
                          )}
                        >
                          <span>{day.getDate()}</span>
                          {dateCellRender && (
                            <div className="mt-xxs">{dateCellRender(day)}</div>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          /* Year view – month picker */
          <div className="grid grid-cols-3 gap-xs">
            {MONTHS.map((monthName, i) => {
              const isCurrentMonth =
                viewDate.getFullYear() === today.getFullYear() && i === today.getMonth();
              const isSelectedMonth =
                selected &&
                selected.getFullYear() === viewDate.getFullYear() &&
                selected.getMonth() === i;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleMonthSelect(i)}
                  className={cn(
                    'py-s px-m text-300 leading-300 rounded-medium outline-none transition-colors duration-fast cursor-pointer',
                    'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
                    'text-neutral-foreground-1 hover:bg-subtle-background-hover',
                    isSelectedMonth &&
                      'bg-brand-background text-neutral-foreground-on-brand hover:bg-brand-background-hover',
                    isCurrentMonth &&
                      !isSelectedMonth &&
                      'ring-1 ring-brand-stroke-1',
                  )}
                >
                  {monthName.slice(0, 3)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

Calendar.displayName = 'Calendar';
