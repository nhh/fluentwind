import { forwardRef, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { TagPickerProps } from './TagPicker.types';

export const TagPicker = forwardRef<HTMLDivElement, TagPickerProps>(
  (
    {
      options,
      selectedValues: controlledValues,
      defaultSelectedValues = [],
      onSelectionChange,
      placeholder = 'Select...',
      size = 'medium',
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValues, setInternalValues] = useState<string[]>(defaultSelectedValues);
    const selectedValues = controlledValues ?? internalValues;

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateValues = useCallback(
      (next: string[]) => {
        if (!controlledValues) {
          setInternalValues(next);
        }
        onSelectionChange?.(next);
      },
      [controlledValues, onSelectionChange],
    );

    const add = useCallback(
      (value: string) => {
        if (!selectedValues.includes(value)) {
          updateValues([...selectedValues, value]);
        }
        setSearch('');
        setIsOpen(false);
        inputRef.current?.focus();
      },
      [selectedValues, updateValues],
    );

    const remove = useCallback(
      (value: string) => {
        updateValues(selectedValues.filter((v) => v !== value));
        inputRef.current?.focus();
      },
      [selectedValues, updateValues],
    );

    const filteredOptions = useMemo(
      () =>
        options.filter(
          (o) =>
            !selectedValues.includes(o.value) &&
            o.label.toLowerCase().includes(search.toLowerCase()),
        ),
      [options, selectedValues, search],
    );

    // Close on outside click
    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, []);

    const selectedLabels = useMemo(() => {
      const map = new Map(options.map((o) => [o.value, o.label]));
      return selectedValues.map((v) => ({ value: v, label: map.get(v) ?? v }));
    }, [options, selectedValues]);

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <div
          ref={containerRef}
          className={cn(
            'flex flex-wrap items-center gap-xxs border border-neutral-stroke-1 bg-neutral-background-1 rounded-medium transition-colors duration-fast',
            'focus-within:border-brand-stroke-1 focus-within:ring-1 focus-within:ring-brand-stroke-1',
            size === 'medium' ? 'px-s py-xxs min-h-8' : 'px-m py-xs min-h-10',
            disabled && 'opacity-50 cursor-not-allowed',
          )}
          onClick={() => {
            if (!disabled) {
              inputRef.current?.focus();
              setIsOpen(true);
            }
          }}
        >
          {selectedLabels.map(({ value, label }) => (
            <span
              key={value}
              className="inline-flex items-center gap-xxs bg-neutral-background-3 text-neutral-foreground-1 rounded-medium px-xs py-0.5 text-200 leading-200"
            >
              <span className="truncate">{label}</span>
              {!disabled && (
                <button
                  type="button"
                  aria-label={`Remove ${label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(value);
                  }}
                  className="inline-flex items-center justify-center shrink-0 h-4 w-4 rounded-circular hover:bg-neutral-background-1-hover transition-colors duration-fast"
                >
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M4.09 4.22a.75.75 0 0 1 1.06-.04L10 8.94l4.85-4.76a.75.75 0 1 1 1.06 1.06L11.06 10l4.85 4.76a.75.75 0 1 1-1.06 1.06L10 11.06l-4.85 4.76a.75.75 0 0 1-1.06-1.06L8.94 10 4.09 5.24a.75.75 0 0 1-.04-1.06l.04.04Z" />
                  </svg>
                </button>
              )}
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={search}
            disabled={disabled}
            placeholder={selectedValues.length === 0 ? placeholder : ''}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => !disabled && setIsOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && search === '' && selectedValues.length > 0) {
                remove(selectedValues[selectedValues.length - 1]);
              }
              if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }}
            className="flex-1 min-w-[80px] bg-transparent border-none outline-none text-300 leading-300 text-neutral-foreground-1 placeholder:text-neutral-foreground-4"
          />
        </div>
        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute z-50 mt-xxs w-full max-h-60 overflow-auto rounded-medium border border-neutral-stroke-1 bg-neutral-background-1 shadow-16 py-xxs">
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'w-full text-start px-m py-xs text-300 leading-300 text-neutral-foreground-1 cursor-pointer transition-colors duration-fast',
                  'hover:bg-subtle-background-hover active:bg-subtle-background-pressed',
                )}
                onClick={() => add(option.value)}
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

TagPicker.displayName = 'TagPicker';
