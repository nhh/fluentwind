import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  Children,
  isValidElement,
} from 'react';
import { cn } from '../../utils/cn';
import type { TreeProps, TreeItemProps, TreeItemLayoutProps } from './Tree.types';

// --- Context ---

interface TreeContextValue {
  openItems: string[];
  toggle: (value: string) => void;
  level: number;
}

const TreeContext = createContext<TreeContextValue>({
  openItems: [],
  toggle: () => {},
  level: 0,
});

// --- Tree ---

export const Tree = forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      openItems: controlledOpenItems,
      defaultOpenItems = [],
      onOpenChange,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const parentCtx = useContext(TreeContext);
    const isNested = parentCtx.level > 0;

    const [internalOpen, setInternalOpen] = useState<string[]>(defaultOpenItems);
    const openItems = controlledOpenItems ?? (isNested ? parentCtx.openItems : internalOpen);

    const toggle = useCallback(
      (value: string) => {
        if (isNested) {
          parentCtx.toggle(value);
          return;
        }
        const isOpen = openItems.includes(value);
        const next = isOpen ? openItems.filter((v) => v !== value) : [...openItems, value];
        if (!controlledOpenItems) {
          setInternalOpen(next);
        }
        onOpenChange?.(next);
      },
      [openItems, controlledOpenItems, onOpenChange, isNested, parentCtx],
    );

    const ctx = useMemo(
      () => ({
        openItems: isNested ? parentCtx.openItems : openItems,
        toggle: isNested ? parentCtx.toggle : toggle,
        level: parentCtx.level + 1,
      }),
      [openItems, toggle, parentCtx, isNested],
    );

    return (
      <TreeContext.Provider value={ctx}>
        <div
          ref={ref}
          role="tree"
          className={cn(isNested ? 'pl-l' : '', className)}
          {...props}
        >
          {children}
        </div>
      </TreeContext.Provider>
    );
  },
);

Tree.displayName = 'Tree';

// --- TreeItem ---

export const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(
  ({ value, leaf = false, className, children, ...props }, ref) => {
    const { openItems, toggle } = useContext(TreeContext);
    const open = openItems.includes(value);

    // Separate layout content from nested Tree children
    const nestedTree: React.ReactNode[] = [];
    const content: React.ReactNode[] = [];
    Children.forEach(children, (child) => {
      if (isValidElement(child) && (child.type as { displayName?: string })?.displayName === 'Tree') {
        nestedTree.push(child);
      } else {
        content.push(child);
      }
    });

    const hasChildren = nestedTree.length > 0 && !leaf;

    return (
      <div ref={ref} role="treeitem" aria-expanded={hasChildren ? open : undefined} className={cn(className)} {...props}>
        <div
          className={cn(
            'flex items-center gap-xs px-s py-xxs rounded-medium cursor-pointer transition-colors duration-fast',
            'hover:bg-subtle-background-hover active:bg-subtle-background-pressed',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
          )}
          tabIndex={0}
          onClick={() => hasChildren && toggle(value)}
          onKeyDown={(e) => {
            if (hasChildren && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              toggle(value);
            }
          }}
        >
          {!leaf && (
            <svg
              className={cn(
                'h-4 w-4 shrink-0 transition-transform duration-normal text-neutral-foreground-3',
                hasChildren ? (open ? 'rotate-90' : '') : 'invisible',
              )}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L10.94 10 7.22 6.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {content}
        </div>
        {hasChildren && open && <div className="mt-xxs">{nestedTree}</div>}
      </div>
    );
  },
);

TreeItem.displayName = 'TreeItem';

// --- TreeItemLayout ---

export const TreeItemLayout = forwardRef<HTMLDivElement, TreeItemLayoutProps>(
  ({ iconBefore, iconAfter, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-xs text-300 leading-300 text-neutral-foreground-1', className)}
        {...props}
      >
        {iconBefore && <span className="shrink-0">{iconBefore}</span>}
        <span className="flex-1 truncate">{children}</span>
        {iconAfter && <span className="shrink-0">{iconAfter}</span>}
      </div>
    );
  },
);

TreeItemLayout.displayName = 'TreeItemLayout';
