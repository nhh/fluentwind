import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import type {
  MenuProps,
  MenuTriggerProps,
  MenuPopoverProps,
  MenuItemProps,
  MenuDividerProps,
  MenuSubProps,
} from './Menu.types';

interface MenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const MenuContext = createContext<MenuContextValue>({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null },
});

export const Menu = ({ open: controlledOpen, onOpenChange, children }: MenuProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const triggerRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback(
    (value: boolean) => {
      setInternalOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpen]);

  return (
    <MenuContext.Provider value={{ open: isOpen, setOpen, triggerRef }}>
      <div ref={triggerRef} className="relative inline-block">
        {children}
      </div>
    </MenuContext.Provider>
  );
};

Menu.displayName = 'Menu';

export const MenuTrigger = ({ children }: MenuTriggerProps) => {
  const { open, setOpen } = useContext(MenuContext);

  return (
    <div
      onClick={() => setOpen(!open)}
      aria-haspopup="menu"
      aria-expanded={open}
    >
      {children}
    </div>
  );
};

MenuTrigger.displayName = 'MenuTrigger';

export const MenuPopover = forwardRef<HTMLDivElement, MenuPopoverProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useContext(MenuContext);
    const internalRef = useRef<HTMLDivElement>(null);

    // Focus first menuitem when menu opens
    useEffect(() => {
      if (open && internalRef.current) {
        const firstItem = internalRef.current.querySelector<HTMLElement>('[role="menuitem"]:not([disabled])');
        firstItem?.focus();
      }
    }, [open]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
        return;
      }

      const container = internalRef.current;
      if (!container) return;

      const items = Array.from(container.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])'));
      if (items.length === 0) return;

      const currentIndex = items.indexOf(document.activeElement as HTMLElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[next]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prev]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
      }
    };

    if (!open) return null;

    const setRefs = (el: HTMLDivElement | null) => {
      (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    return (
      <div
        ref={setRefs}
        role="menu"
        onKeyDown={handleKeyDown}
        className={cn(
          'absolute top-full left-0 z-50 mt-xxs min-w-[160px] bg-neutral-background-1 text-neutral-foreground-1 rounded-medium shadow-16 border border-neutral-stroke-1 py-xs animate-[fw-fade-slide-in_150ms_var(--ease-decelerate-mid)]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

MenuPopover.displayName = 'MenuPopover';

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ icon, secondaryContent, disabled, className, children, onClick, ...props }, ref) => {
    const { setOpen } = useContext(MenuContext);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        setOpen(false);
        onClick?.(e);
      }
    };

    return (
      <button
        ref={ref}
        role="menuitem"
        type="button"
        disabled={disabled}
        className={cn(
          'flex items-center w-full text-left px-m py-s gap-s text-300 leading-300 transition-colors duration-fast cursor-pointer outline-none',
          'hover:bg-subtle-background-hover focus-visible:bg-subtle-background-hover',
          'active:bg-subtle-background-pressed',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1">{children}</span>
        {secondaryContent && (
          <span className="text-neutral-foreground-2 text-200 leading-200">
            {secondaryContent}
          </span>
        )}
      </button>
    );
  },
);

MenuItem.displayName = 'MenuItem';

export const MenuDivider = forwardRef<HTMLDivElement, MenuDividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn('h-px my-xs bg-neutral-stroke-2', className)}
        {...props}
      />
    );
  },
);

MenuDivider.displayName = 'MenuDivider';

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0 text-neutral-foreground-3">
    <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MenuSub = ({ label, icon, children }: MenuSubProps) => {
  const [subOpen, setSubOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setSubOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setSubOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={subOpen}
        className={cn(
          'flex items-center w-full text-left px-m py-s gap-s text-300 leading-300 transition-colors duration-fast cursor-pointer outline-none',
          'hover:bg-subtle-background-hover focus-visible:bg-subtle-background-hover',
        )}
        onClick={() => setSubOpen(!subOpen)}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1">{label}</span>
        <ChevronRight />
      </button>
      {subOpen && (
        <div
          role="menu"
          className="absolute left-full top-0 z-50 ml-xxs min-w-[160px] bg-neutral-background-1 text-neutral-foreground-1 rounded-medium shadow-16 border border-neutral-stroke-1 py-xs animate-[fw-fade-slide-in_100ms_var(--ease-decelerate-mid)]"
        >
          {children}
        </div>
      )}
    </div>
  );
};

MenuSub.displayName = 'MenuSub';
