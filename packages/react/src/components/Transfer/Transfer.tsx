import { forwardRef, useState, useCallback, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { TransferProps, TransferItem } from './Transfer.types';

const chevronRightSvg = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M6 3.5L10.5 8L6 12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const chevronLeftSvg = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M10 3.5L5.5 8L10 12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const checkSvg = (
  <svg
    className="absolute pointer-events-none text-neutral-foreground-on-brand opacity-0 peer-checked:opacity-100 transition-opacity duration-fast"
    width="10"
    height="10"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 6L5 8.5L9.5 3.5" />
  </svg>
);

interface TransferPanelProps {
  title: React.ReactNode;
  items: TransferItem[];
  checkedKeys: Set<string>;
  onCheck: (key: string) => void;
  onCheckAll: () => void;
  showSearch: boolean;
  disabled: boolean;
  searchValue: string;
  onSearchChange: (val: string) => void;
}

function TransferPanel({
  title,
  items,
  checkedKeys,
  onCheck,
  onCheckAll,
  showSearch,
  disabled,
  searchValue,
  onSearchChange,
}: TransferPanelProps) {
  const enabledItems = items.filter((item) => !item.disabled);
  const allChecked = enabledItems.length > 0 && enabledItems.every((item) => checkedKeys.has(item.key));
  const someChecked = enabledItems.some((item) => checkedKeys.has(item.key));
  const checkedCount = items.filter((item) => checkedKeys.has(item.key)).length;

  const filteredItems = useMemo(() => {
    if (!searchValue) return items;
    const lower = searchValue.toLowerCase();
    return items.filter((item) => {
      const text = typeof item.label === 'string' ? item.label : String(item.label);
      return text.toLowerCase().includes(lower);
    });
  }, [items, searchValue]);

  return (
    <div className="flex flex-col w-56 border border-neutral-stroke-2 bg-neutral-background-1 rounded-medium overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-xs px-m py-s border-b border-neutral-stroke-2">
        <span className="relative inline-flex items-center justify-center">
          <input
            type="checkbox"
            checked={allChecked}
            ref={(el) => {
              if (el) el.indeterminate = someChecked && !allChecked;
            }}
            onChange={onCheckAll}
            disabled={disabled || enabledItems.length === 0}
            className={cn(
              'peer appearance-none h-4 w-4 cursor-pointer border border-neutral-stroke-accessible rounded-small transition-colors duration-fast',
              'checked:bg-brand-background checked:border-brand-background',
              'hover:border-neutral-stroke-accessible-hover',
              'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
              disabled && 'cursor-not-allowed opacity-50',
            )}
          />
          {checkSvg}
        </span>
        <span className="text-300 leading-300 font-semibold text-neutral-foreground-1 flex-1 select-none">
          {title}
        </span>
        <span className="text-200 leading-200 text-neutral-foreground-3">
          {checkedCount}/{items.length}
        </span>
      </div>

      {/* Search */}
      {showSearch && (
        <div className="px-m py-xs border-b border-neutral-stroke-2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            disabled={disabled}
            className={cn(
              'w-full text-200 leading-200 px-s py-xxs rounded-medium',
              'bg-neutral-background-1 text-neutral-foreground-1',
              'border border-neutral-stroke-1',
              'outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
              'placeholder:text-neutral-foreground-4',
              disabled && 'cursor-not-allowed opacity-50',
            )}
          />
        </div>
      )}

      {/* Items */}
      <div className="flex-1 overflow-y-auto h-60 py-xs" role="listbox" aria-label={typeof title === 'string' ? title : undefined}>
        {filteredItems.length === 0 ? (
          <div className="flex items-center justify-center h-full text-200 text-neutral-foreground-4">
            No items
          </div>
        ) : (
          filteredItems.map((item) => (
            <label
              key={item.key}
              role="option"
              aria-selected={checkedKeys.has(item.key)}
              className={cn(
                'flex items-center gap-xs px-m py-xxs cursor-pointer transition-colors duration-fast',
                'hover:bg-subtle-background-hover',
                (item.disabled || disabled) && 'cursor-not-allowed opacity-50',
              )}
            >
              <span className="relative inline-flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={checkedKeys.has(item.key)}
                  onChange={() => onCheck(item.key)}
                  disabled={item.disabled || disabled}
                  className={cn(
                    'peer appearance-none h-4 w-4 cursor-pointer border border-neutral-stroke-accessible rounded-small transition-colors duration-fast',
                    'checked:bg-brand-background checked:border-brand-background',
                    'hover:border-neutral-stroke-accessible-hover',
                    'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
                    (item.disabled || disabled) && 'cursor-not-allowed',
                  )}
                />
                {checkSvg}
              </span>
              <span className="text-300 leading-300 text-neutral-foreground-1 select-none truncate">
                {item.label}
              </span>
            </label>
          ))
        )}
      </div>
    </div>
  );
}

export const Transfer = forwardRef<HTMLDivElement, TransferProps>(
  (
    {
      dataSource,
      targetKeys,
      defaultTargetKeys = [],
      onChange,
      titles = ['Source', 'Target'],
      showSearch = false,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = targetKeys !== undefined;
    const [internalTargetKeys, setInternalTargetKeys] = useState<string[]>(defaultTargetKeys);
    const currentTargetKeys = isControlled ? targetKeys : internalTargetKeys;
    const targetKeySet = useMemo(() => new Set(currentTargetKeys), [currentTargetKeys]);

    const [leftChecked, setLeftChecked] = useState<Set<string>>(new Set());
    const [rightChecked, setRightChecked] = useState<Set<string>>(new Set());
    const [leftSearch, setLeftSearch] = useState('');
    const [rightSearch, setRightSearch] = useState('');

    const leftItems = useMemo(
      () => dataSource.filter((item) => !targetKeySet.has(item.key)),
      [dataSource, targetKeySet],
    );

    const rightItems = useMemo(
      () => dataSource.filter((item) => targetKeySet.has(item.key)),
      [dataSource, targetKeySet],
    );

    const updateTargetKeys = useCallback(
      (keys: string[]) => {
        if (!isControlled) {
          setInternalTargetKeys(keys);
        }
        onChange?.(keys);
      },
      [isControlled, onChange],
    );

    const handleMoveRight = useCallback(() => {
      if (leftChecked.size === 0) return;
      const newKeys = [...currentTargetKeys, ...leftChecked];
      updateTargetKeys(newKeys);
      setLeftChecked(new Set());
    }, [leftChecked, currentTargetKeys, updateTargetKeys]);

    const handleMoveLeft = useCallback(() => {
      if (rightChecked.size === 0) return;
      const newKeys = currentTargetKeys.filter((key) => !rightChecked.has(key));
      updateTargetKeys(newKeys);
      setRightChecked(new Set());
    }, [rightChecked, currentTargetKeys, updateTargetKeys]);

    const toggleCheck = useCallback(
      (set: Set<string>, setFn: React.Dispatch<React.SetStateAction<Set<string>>>, key: string) => {
        const next = new Set(set);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        setFn(next);
      },
      [],
    );

    const toggleCheckAll = useCallback(
      (
        items: TransferItem[],
        checkedKeys: Set<string>,
        setFn: React.Dispatch<React.SetStateAction<Set<string>>>,
      ) => {
        const enabledItems = items.filter((item) => !item.disabled);
        const allChecked = enabledItems.every((item) => checkedKeys.has(item.key));
        if (allChecked) {
          setFn(new Set());
        } else {
          setFn(new Set(enabledItems.map((item) => item.key)));
        }
      },
      [],
    );

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center gap-m', className)}
        {...props}
      >
        <TransferPanel
          title={titles[0]}
          items={leftItems}
          checkedKeys={leftChecked}
          onCheck={(key) => toggleCheck(leftChecked, setLeftChecked, key)}
          onCheckAll={() => toggleCheckAll(leftItems, leftChecked, setLeftChecked)}
          showSearch={showSearch}
          disabled={disabled}
          searchValue={leftSearch}
          onSearchChange={setLeftSearch}
        />

        {/* Actions */}
        <div className="flex flex-col gap-s">
          <button
            type="button"
            disabled={disabled || leftChecked.size === 0}
            aria-label="Move selected items to target"
            className={cn(
              'inline-flex items-center justify-center h-8 w-8 rounded-medium border border-neutral-stroke-1',
              'bg-neutral-background-1 text-neutral-foreground-1',
              'transition-colors duration-fast cursor-pointer',
              'hover:bg-neutral-background-1-hover',
              'active:bg-neutral-background-1-pressed',
              'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
              'outline-none',
              (disabled || leftChecked.size === 0) &&
                'opacity-50 cursor-not-allowed bg-neutral-background-disabled',
            )}
            onClick={handleMoveRight}
          >
            {chevronRightSvg}
          </button>
          <button
            type="button"
            disabled={disabled || rightChecked.size === 0}
            aria-label="Move selected items to source"
            className={cn(
              'inline-flex items-center justify-center h-8 w-8 rounded-medium border border-neutral-stroke-1',
              'bg-neutral-background-1 text-neutral-foreground-1',
              'transition-colors duration-fast cursor-pointer',
              'hover:bg-neutral-background-1-hover',
              'active:bg-neutral-background-1-pressed',
              'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
              'outline-none',
              (disabled || rightChecked.size === 0) &&
                'opacity-50 cursor-not-allowed bg-neutral-background-disabled',
            )}
            onClick={handleMoveLeft}
          >
            {chevronLeftSvg}
          </button>
        </div>

        <TransferPanel
          title={titles[1]}
          items={rightItems}
          checkedKeys={rightChecked}
          onCheck={(key) => toggleCheck(rightChecked, setRightChecked, key)}
          onCheckAll={() => toggleCheckAll(rightItems, rightChecked, setRightChecked)}
          showSearch={showSearch}
          disabled={disabled}
          searchValue={rightSearch}
          onSearchChange={setRightSearch}
        />
      </div>
    );
  },
);

Transfer.displayName = 'Transfer';
