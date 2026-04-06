import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { cn } from '../../utils/cn';
import { cva } from 'class-variance-authority';
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionPanelProps,
} from './Accordion.types';

// --- Context ---

interface AccordionContextValue {
  openItems: string[];
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue>({
  openItems: [],
  toggle: () => {},
});

interface AccordionItemContextValue {
  value: string;
  open: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue>({
  value: '',
  open: false,
});

// --- Accordion ---

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      multiple = false,
      collapsible = true,
      openItems: controlledOpenItems,
      defaultOpenItems = [],
      onToggle,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState<string[]>(defaultOpenItems);
    const openItems = controlledOpenItems ?? internalOpen;

    const toggle = useCallback(
      (value: string) => {
        let next: string[];
        const isOpen = openItems.includes(value);

        if (isOpen) {
          if (!collapsible && openItems.length === 1) return;
          next = openItems.filter((v) => v !== value);
        } else {
          next = multiple ? [...openItems, value] : [value];
        }

        if (!controlledOpenItems) {
          setInternalOpen(next);
        }
        onToggle?.(next);
      },
      [openItems, multiple, collapsible, controlledOpenItems, onToggle],
    );

    const ctx = useMemo(() => ({ openItems, toggle }), [openItems, toggle]);

    return (
      <AccordionContext.Provider value={ctx}>
        <div ref={ref} className={cn('divide-y divide-neutral-stroke-2', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

Accordion.displayName = 'Accordion';

// --- AccordionItem ---

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const { openItems } = useContext(AccordionContext);
    const open = openItems.includes(value);

    const ctx = useMemo(() => ({ value, open }), [value, open]);

    return (
      <AccordionItemContext.Provider value={ctx}>
        <div ref={ref} className={cn('py-xs', className)} {...props}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';

// --- AccordionHeader ---

const headerVariants = cva(
  'flex w-full items-center gap-s text-neutral-foreground-1 bg-transparent-background hover:bg-subtle-background-hover active:bg-subtle-background-pressed cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 transition-colors duration-fast',
  {
    variants: {
      size: {
        small: 'text-200 leading-200 py-xxs px-s',
        medium: 'text-300 leading-300 py-xs px-m',
        large: 'text-400 leading-400 py-s px-m',
        extraLarge: 'text-500 leading-500 py-s px-l',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

export const AccordionHeader = forwardRef<HTMLButtonElement, AccordionHeaderProps>(
  ({ icon, size, expandIconPosition = 'start', className, children, ...props }, ref) => {
    const { toggle } = useContext(AccordionContext);
    const { value, open } = useContext(AccordionItemContext);

    const chevron = (
      <svg
        className={cn(
          'h-4 w-4 shrink-0 transition-transform duration-normal',
          open && 'rotate-90',
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
    );

    return (
      <button
        ref={ref}
        type="button"
        id={`header-${value}`}
        aria-expanded={open}
        aria-controls={`panel-${value}`}
        onClick={() => toggle(value)}
        className={cn(headerVariants({ size }), className)}
        {...props}
      >
        {expandIconPosition === 'start' && chevron}
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1 text-start">{children}</span>
        {expandIconPosition === 'end' && chevron}
      </button>
    );
  },
);

AccordionHeader.displayName = 'AccordionHeader';

// --- AccordionPanel ---

export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
  ({ className, children, ...props }, ref) => {
    const { value, open } = useContext(AccordionItemContext);

    return (
      <div
        ref={ref}
        role="region"
        id={`panel-${value}`}
        aria-labelledby={`header-${value}`}
        className={cn(
          'overflow-hidden transition-all duration-normal',
          open ? 'grid grid-rows-[1fr] opacity-100' : 'grid grid-rows-[0fr] opacity-0',
          className,
        )}
        {...props}
      >
        <div className="overflow-hidden">
          <div className="px-m py-s text-neutral-foreground-2 text-300 leading-300">
            {children}
          </div>
        </div>
      </div>
    );
  },
);

AccordionPanel.displayName = 'AccordionPanel';
