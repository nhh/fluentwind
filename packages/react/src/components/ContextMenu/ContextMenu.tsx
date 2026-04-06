import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import type {
  ContextMenuProps,
  ContextMenuItemProps,
  ContextMenuDividerProps,
} from './ContextMenu.types';

interface ContextMenuContextValue {
  close: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue>({
  close: () => {},
});

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ content, disabled = false, onOpenChange, className, children, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => {
      setOpen(false);
      onOpenChange?.(false);
    }, [onOpenChange]);

    const handleContextMenu = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return;
        e.preventDefault();
        setPosition({ x: e.clientX, y: e.clientY });
        setOpen(true);
        onOpenChange?.(true);
      },
      [disabled, onOpenChange],
    );

    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          close();
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          close();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, close]);

    // Focus first item when menu opens
    useEffect(() => {
      if (open && menuRef.current) {
        const firstItem = menuRef.current.querySelector<HTMLElement>(
          '[role="menuitem"]:not([disabled])',
        );
        firstItem?.focus();
      }
    }, [open]);

    const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const container = menuRef.current;
      if (!container) return;

      const items = Array.from(
        container.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])'),
      );
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

    return (
      <ContextMenuContext.Provider value={{ close }}>
        <div
          ref={ref}
          onContextMenu={handleContextMenu}
          className={className}
          {...props}
        >
          {children}
        </div>
        {open &&
          createPortal(
            <div
              ref={menuRef}
              role="menu"
              onKeyDown={handleMenuKeyDown}
              className="fixed z-50 min-w-[160px] bg-neutral-background-1 text-neutral-foreground-1 rounded-medium shadow-16 border border-neutral-stroke-1 py-xs animate-[fw-fade-slide-in_150ms_var(--ease-decelerate-mid)]"
              style={{ top: position.y, left: position.x }}
            >
              {content}
            </div>,
            document.body,
          )}
      </ContextMenuContext.Provider>
    );
  },
);

ContextMenu.displayName = 'ContextMenu';

export const ContextMenuItem = forwardRef<HTMLButtonElement, ContextMenuItemProps>(
  ({ icon, shortcut, disabled = false, className, children, onClick, ...props }, ref) => {
    const { close } = useContext(ContextMenuContext);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        close();
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
        {shortcut && (
          <span className="text-neutral-foreground-3 text-200 leading-200 ml-l">
            {shortcut}
          </span>
        )}
      </button>
    );
  },
);

ContextMenuItem.displayName = 'ContextMenuItem';

export const ContextMenuDivider = forwardRef<HTMLDivElement, ContextMenuDividerProps>(
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

ContextMenuDivider.displayName = 'ContextMenuDivider';
