import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { TreeSelectProps, TreeSelectNode } from './TreeSelect.types';

const triggerVariants = cva(
  'fw-input-underline inline-flex items-center justify-between gap-xs w-full cursor-pointer transition-colors duration-fast outline-none text-neutral-foreground-1',
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

const ChevronRightIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    className={cn(
      'h-4 w-4 shrink-0 transition-transform duration-normal text-neutral-foreground-3',
      open ? 'rotate-90' : '',
    )}
  >
    <path
      fillRule="evenodd"
      d="M7.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L10.94 10 7.22 6.28a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

function findNodeByKey(
  nodes: TreeSelectNode[],
  key: string,
): TreeSelectNode | null {
  for (const node of nodes) {
    if (node.key === key) return node;
    if (node.children) {
      const found = findNodeByKey(node.children, key);
      if (found) return found;
    }
  }
  return null;
}

function flattenKeys(nodes: TreeSelectNode[]): string[] {
  const keys: string[] = [];
  for (const node of nodes) {
    keys.push(node.key);
    if (node.children) {
      keys.push(...flattenKeys(node.children));
    }
  }
  return keys;
}

interface TreeNodeRendererProps {
  node: TreeSelectNode;
  level: number;
  expandedKeys: string[];
  selectedKeys: string[];
  multiple: boolean;
  onToggleExpand: (key: string) => void;
  onSelect: (key: string) => void;
}

function TreeNodeRenderer({
  node,
  level,
  expandedKeys,
  selectedKeys,
  multiple,
  onToggleExpand,
  onSelect,
}: TreeNodeRendererProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedKeys.includes(node.key);
  const isSelected = selectedKeys.includes(node.key);

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={isSelected}>
      <div
        className={cn(
          'flex items-center gap-xs py-xxs px-s rounded-medium cursor-pointer transition-colors duration-fast',
          'hover:bg-subtle-background-hover',
          isSelected && !multiple && 'bg-subtle-background-selected',
          node.disabled && 'opacity-50 cursor-not-allowed',
        )}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={() => {
          if (node.disabled) return;
          if (hasChildren) {
            onToggleExpand(node.key);
          }
          onSelect(node.key);
        }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(node.key);
            }}
            className="shrink-0 outline-none"
            tabIndex={-1}
          >
            <ChevronRightIcon open={isExpanded} />
          </button>
        ) : (
          <span className="w-4 shrink-0" />
        )}
        {multiple && (
          <input
            type="checkbox"
            checked={isSelected}
            disabled={node.disabled}
            onChange={() => {
              if (!node.disabled) onSelect(node.key);
            }}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 accent-brand-background"
          />
        )}
        <span className="text-300 leading-300 text-neutral-foreground-1 truncate">
          {node.label}
        </span>
      </div>
      {hasChildren && isExpanded && (
        <div role="group">
          {node.children!.map((child) => (
            <TreeNodeRenderer
              key={child.key}
              node={child}
              level={level + 1}
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              multiple={multiple}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export const TreeSelect = forwardRef<HTMLDivElement, TreeSelectProps>(
  (
    {
      treeData,
      value,
      defaultValue,
      onChange,
      multiple = false,
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

    const normalizeValue = (v: string | string[] | undefined): string[] => {
      if (v === undefined) return [];
      return Array.isArray(v) ? v : [v];
    };

    const [internalValue, setInternalValue] = useState<string[]>(
      normalizeValue(defaultValue),
    );
    const selected = normalizeValue(isControlled ? value : internalValue);

    const [open, setOpen] = useState(false);
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const handleClose = () => setOpen(false);

    const handleToggle = () => {
      if (disabled) return;
      setOpen((prev) => !prev);
    };

    const handleToggleExpand = useCallback((key: string) => {
      setExpandedKeys((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
      );
    }, []);

    const handleSelect = useCallback(
      (key: string) => {
        if (multiple) {
          const newSelected = selected.includes(key)
            ? selected.filter((k) => k !== key)
            : [...selected, key];
          if (!isControlled) setInternalValue(newSelected);
          onChange?.(newSelected);
        } else {
          const newValue = key;
          if (!isControlled) setInternalValue([newValue]);
          onChange?.(newValue);
          handleClose();
          triggerRef.current?.focus();
        }
      },
      [multiple, selected, isControlled, onChange],
    );

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

    // Build display text
    const displayLabels = selected
      .map((key) => {
        const node = findNodeByKey(treeData, key);
        return node ? String(node.label) : key;
      })
      .filter(Boolean);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        triggerRef.current?.focus();
      }
    };

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
            aria-haspopup="tree"
            disabled={disabled}
            onClick={handleToggle}
            className={cn(
              triggerVariants({ appearance, size }),
              disabled && 'opacity-50 cursor-not-allowed bg-neutral-background-disabled border-neutral-stroke-disabled',
            )}
          >
            <span className={cn('flex-1 text-left flex flex-wrap gap-xxs', !displayLabels.length && 'text-neutral-foreground-4')}>
              {displayLabels.length > 0 ? (
                multiple ? (
                  displayLabels.map((label, i) => (
                    <span
                      key={selected[i]}
                      className="inline-flex items-center px-xs py-0 bg-neutral-background-3 rounded-small text-200 leading-200 text-neutral-foreground-1"
                    >
                      {label}
                    </span>
                  ))
                ) : (
                  <span className="truncate">{displayLabels[0]}</span>
                )
              ) : (
                placeholder
              )}
            </span>
            <ChevronDown />
          </button>

          {open && (
            <div
              role="tree"
              className="absolute z-50 mt-xxs w-full bg-neutral-background-1 border border-neutral-stroke-1 rounded-medium shadow-8 max-h-60 overflow-y-auto py-xs"
            >
              {treeData.map((node) => (
                <TreeNodeRenderer
                  key={node.key}
                  node={node}
                  level={0}
                  expandedKeys={expandedKeys}
                  selectedKeys={selected}
                  multiple={multiple}
                  onToggleExpand={handleToggleExpand}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

TreeSelect.displayName = 'TreeSelect';
