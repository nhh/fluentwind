import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { cn } from '../../utils/cn';
import type {
  MenubarProps,
  MenubarMenuProps,
  MenubarItemProps,
  MenubarDividerProps,
} from './Menubar.types';

interface MenubarContextValue {
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  registerMenu: (id: string, triggerEl: HTMLButtonElement) => void;
  unregisterMenu: (id: string) => void;
  navigateMenu: (direction: 'prev' | 'next', currentId: string) => void;
}

const MenubarContext = createContext<MenubarContextValue>({
  openMenuId: null,
  setOpenMenuId: () => {},
  registerMenu: () => {},
  unregisterMenu: () => {},
  navigateMenu: () => {},
});

let menubarMenuIdCounter = 0;

export const Menubar = forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, children, ...props }, ref) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuTriggers = useRef<Map<string, HTMLButtonElement>>(new Map());
    const menuOrder = useRef<string[]>([]);

    const registerMenu = useCallback((id: string, triggerEl: HTMLButtonElement) => {
      menuTriggers.current.set(id, triggerEl);
      if (!menuOrder.current.includes(id)) {
        menuOrder.current.push(id);
      }
    }, []);

    const unregisterMenu = useCallback((id: string) => {
      menuTriggers.current.delete(id);
      menuOrder.current = menuOrder.current.filter((mId) => mId !== id);
    }, []);

    const navigateMenu = useCallback(
      (direction: 'prev' | 'next', currentId: string) => {
        const order = menuOrder.current;
        const idx = order.indexOf(currentId);
        if (idx === -1) return;

        const nextIdx =
          direction === 'next'
            ? (idx + 1) % order.length
            : (idx - 1 + order.length) % order.length;
        const nextId = order[nextIdx];
        setOpenMenuId(nextId);
        menuTriggers.current.get(nextId)?.focus();
      },
      [],
    );

    useEffect(() => {
      if (!openMenuId) return;

      const handleClickOutside = (e: MouseEvent) => {
        const triggers = Array.from(menuTriggers.current.values());
        const clickedInside = triggers.some(
          (el) => el.closest('[data-menubar-menu]')?.contains(e.target as Node),
        );
        if (!clickedInside) {
          setOpenMenuId(null);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openMenuId]);

    return (
      <MenubarContext.Provider
        value={{ openMenuId, setOpenMenuId, registerMenu, unregisterMenu, navigateMenu }}
      >
        <div
          ref={ref}
          role="menubar"
          className={cn(
            'flex items-center bg-neutral-background-3 border-b border-neutral-stroke-2 px-xs',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </MenubarContext.Provider>
    );
  },
);

Menubar.displayName = 'Menubar';

export const MenubarMenu = forwardRef<HTMLDivElement, MenubarMenuProps>(
  ({ trigger, className, children, ...props }, ref) => {
    const [menuId] = useState(() => `menubar-menu-${++menubarMenuIdCounter}`);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { openMenuId, setOpenMenuId, registerMenu, unregisterMenu, navigateMenu } =
      useContext(MenubarContext);

    const isOpen = openMenuId === menuId;

    useEffect(() => {
      if (triggerRef.current) {
        registerMenu(menuId, triggerRef.current);
      }
      return () => unregisterMenu(menuId);
    }, [menuId, registerMenu, unregisterMenu]);

    useEffect(() => {
      if (isOpen && dropdownRef.current) {
        const firstItem = dropdownRef.current.querySelector<HTMLElement>(
          '[role="menuitem"]:not([disabled])',
        );
        firstItem?.focus();
      }
    }, [isOpen]);

    const handleTriggerClick = useCallback(() => {
      setOpenMenuId(isOpen ? null : menuId);
    }, [isOpen, menuId, setOpenMenuId]);

    const handleTriggerMouseEnter = useCallback(() => {
      if (openMenuId !== null && openMenuId !== menuId) {
        setOpenMenuId(menuId);
      }
    }, [openMenuId, menuId, setOpenMenuId]);

    const handleTriggerKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpenMenuId(menuId);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          navigateMenu('prev', menuId);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          navigateMenu('next', menuId);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setOpenMenuId(null);
        }
      },
      [menuId, setOpenMenuId, navigateMenu],
    );

    const handleDropdownKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          setOpenMenuId(null);
          triggerRef.current?.focus();
          return;
        }

        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          navigateMenu('prev', menuId);
          return;
        }

        if (e.key === 'ArrowRight') {
          e.preventDefault();
          navigateMenu('next', menuId);
          return;
        }

        const container = dropdownRef.current;
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
      },
      [menuId, setOpenMenuId, navigateMenu],
    );

    return (
      <div
        ref={ref}
        data-menubar-menu
        className={cn('relative', className)}
        {...props}
      >
        <button
          ref={triggerRef}
          role="menuitem"
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={handleTriggerClick}
          onMouseEnter={handleTriggerMouseEnter}
          onKeyDown={handleTriggerKeyDown}
          className={cn(
            'px-m py-xs text-200 leading-200 rounded-medium cursor-pointer outline-none transition-colors duration-fast',
            'hover:bg-subtle-background-hover focus-visible:bg-subtle-background-hover',
            isOpen && 'bg-subtle-background-hover',
          )}
        >
          {trigger}
        </button>
        {isOpen && (
          <div
            ref={dropdownRef}
            role="menu"
            onKeyDown={handleDropdownKeyDown}
            className="absolute top-full left-0 z-50 mt-xxs min-w-[160px] bg-neutral-background-1 text-neutral-foreground-1 rounded-medium shadow-16 border border-neutral-stroke-1 py-xs animate-[fw-fade-slide-in_150ms_var(--ease-decelerate-mid)]"
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);

MenubarMenu.displayName = 'MenubarMenu';

export const MenubarItem = forwardRef<HTMLButtonElement, MenubarItemProps>(
  ({ icon, shortcut, disabled, className, children, onClick, ...props }, ref) => {
    const { setOpenMenuId } = useContext(MenubarContext);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        setOpenMenuId(null);
        onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
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
          <span className="text-neutral-foreground-2 text-200 leading-200 ml-l">
            {shortcut}
          </span>
        )}
      </button>
    );
  },
);

MenubarItem.displayName = 'MenubarItem';

export const MenubarDivider = forwardRef<HTMLDivElement, MenubarDividerProps>(
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

MenubarDivider.displayName = 'MenubarDivider';
