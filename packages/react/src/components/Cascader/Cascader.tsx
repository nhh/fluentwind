import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { CascaderProps, CascaderOption } from './Cascader.types';

const triggerVariants = cva(
  'inline-flex items-center justify-between gap-xs w-full cursor-pointer transition-colors duration-fast outline-none text-neutral-foreground-1 focus-within:ring-2 focus-within:ring-neutral-stroke-focus-2 focus-within:ring-offset-1 focus-within:ring-offset-neutral-stroke-focus-1',
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

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0 text-neutral-foreground-3">
    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightSmall = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0 text-neutral-foreground-3">
    <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function getLabelsForPath(
  options: CascaderOption[],
  path: string[],
): string {
  const labels: string[] = [];
  let current = options;
  for (const val of path) {
    const found = current.find((o) => o.value === val);
    if (!found) break;
    labels.push(String(found.label));
    current = found.children ?? [];
  }
  return labels.join(' / ');
}

function getOptionsForPath(
  options: CascaderOption[],
  path: string[],
): CascaderOption[] {
  const found = options.find((o) => o.value === path[0]);
  if (!found || path.length <= 1) return options;
  return getOptionsForPath(found.children ?? [], path.slice(1));
}

function collectSelectedOptions(
  options: CascaderOption[],
  path: string[],
): CascaderOption[] {
  const result: CascaderOption[] = [];
  let current = options;
  for (const val of path) {
    const found = current.find((o) => o.value === val);
    if (!found) break;
    result.push(found);
    current = found.children ?? [];
  }
  return result;
}

export const Cascader = forwardRef<HTMLDivElement, CascaderProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = 'Select...',
      disabled = false,
      size = 'medium',
      appearance = 'outline',
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? []);
    const selected = isControlled ? (value ?? []) : internalValue;

    const [open, setOpen] = useState(false);
    // expandedPath tracks which options are expanded in the columns
    const [expandedPath, setExpandedPath] = useState<string[]>([]);
    const [focusColumn, setFocusColumn] = useState(0);
    const [focusIndex, setFocusIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const handleOpen = () => {
      if (disabled) return;
      setOpen(true);
      setExpandedPath(selected.length > 0 ? selected.slice(0, -1) : []);
      setFocusColumn(0);
      setFocusIndex(0);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleToggle = () => {
      if (open) handleClose();
      else handleOpen();
    };

    const handleSelectOption = useCallback(
      (option: CascaderOption, columnIndex: number) => {
        if (option.disabled) return;

        const newPath = [...expandedPath.slice(0, columnIndex), option.value];

        if (option.children && option.children.length > 0) {
          // Expand next column
          setExpandedPath(newPath);
          setFocusColumn(columnIndex + 1);
          setFocusIndex(0);
        } else {
          // Leaf node - select and close
          if (!isControlled) setInternalValue(newPath);
          onChange?.(newPath, collectSelectedOptions(options, newPath));
          handleClose();
          triggerRef.current?.focus();
        }
      },
      [expandedPath, isControlled, onChange, options],
    );

    // Build columns from expanded path
    const columns: { options: CascaderOption[]; selectedValue: string | null }[] = [];
    columns.push({ options, selectedValue: expandedPath[0] ?? null });
    let currentOptions = options;
    for (let i = 0; i < expandedPath.length; i++) {
      const found = currentOptions.find((o) => o.value === expandedPath[i]);
      if (found?.children && found.children.length > 0) {
        currentOptions = found.children;
        columns.push({
          options: currentOptions,
          selectedValue: expandedPath[i + 1] ?? null,
        });
      } else {
        break;
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          handleOpen();
        }
        return;
      }

      const col = columns[focusColumn];
      if (!col) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusIndex((prev) => Math.min(prev + 1, col.options.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'ArrowRight': {
          e.preventDefault();
          const focused = col.options[focusIndex];
          if (focused?.children && focused.children.length > 0) {
            handleSelectOption(focused, focusColumn);
          }
          break;
        }
        case 'ArrowLeft':
          e.preventDefault();
          if (focusColumn > 0) {
            setFocusColumn(focusColumn - 1);
            setFocusIndex(0);
          }
          break;
        case 'Enter': {
          e.preventDefault();
          const focused = col.options[focusIndex];
          if (focused) {
            handleSelectOption(focused, focusColumn);
          }
          break;
        }
        case 'Escape':
          e.preventDefault();
          handleClose();
          triggerRef.current?.focus();
          break;
      }
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

    const displayText = selected.length > 0 ? getLabelsForPath(options, selected) : '';

    return (
      <div
        ref={ref}
        className={cn('relative inline-block w-full', className)}
        {...props}
      >
        <div ref={containerRef} onKeyDown={handleKeyDown}>
          <button
            ref={triggerRef}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            disabled={disabled}
            onClick={handleToggle}
            className={cn(
              triggerVariants({ appearance, size }),
              disabled && 'opacity-50 cursor-not-allowed bg-neutral-background-disabled border-neutral-stroke-disabled',
            )}
          >
            <span className={cn('flex-1 text-left truncate', !displayText && 'text-neutral-foreground-4')}>
              {displayText || placeholder}
            </span>
            <ChevronDown />
          </button>

          {open && (
            <div className="absolute z-50 mt-xxs flex bg-neutral-background-1 border border-neutral-stroke-1 rounded-medium shadow-16 overflow-hidden">
              {columns.map((col, colIndex) => (
                <div
                  key={colIndex}
                  role="listbox"
                  className={cn(
                    'w-[180px] max-h-60 overflow-y-auto py-xs',
                    colIndex < columns.length - 1 && 'border-r border-neutral-stroke-1',
                  )}
                >
                  {col.options.map((option, optIndex) => {
                    const isExpanded = col.selectedValue === option.value;
                    const isSelectedLeaf =
                      selected.length > 0 &&
                      colIndex === selected.length - 1 &&
                      selected[colIndex] === option.value;
                    const isFocused = focusColumn === colIndex && focusIndex === optIndex;

                    return (
                      <div
                        key={option.value}
                        role="option"
                        aria-selected={isExpanded || isSelectedLeaf}
                        aria-disabled={option.disabled}
                        onClick={() => handleSelectOption(option, colIndex)}
                        className={cn(
                          'flex items-center justify-between px-m py-xs cursor-pointer transition-colors duration-fast text-300 leading-300',
                          'hover:bg-subtle-background-hover',
                          (isExpanded || isSelectedLeaf) && 'text-brand-foreground-1',
                          isFocused && 'bg-subtle-background-hover',
                          option.disabled && 'opacity-50 cursor-not-allowed',
                        )}
                      >
                        <span className="truncate">{option.label}</span>
                        {option.children && option.children.length > 0 && <ChevronRightSmall />}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

Cascader.displayName = 'Cascader';
