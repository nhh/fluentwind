import { forwardRef, createContext, useContext } from 'react';
import { cn } from '../../utils/cn';
import type { NavProps, NavItemProps } from './Nav.types';

interface NavContextValue {
  size: 'small' | 'medium' | 'large';
}

const NavContext = createContext<NavContextValue>({ size: 'medium' });

const sizeStyles: Record<string, string> = {
  small: 'text-200 leading-200 px-s py-xxs gap-xs min-h-6',
  medium: 'text-300 leading-300 px-m py-xs gap-xs min-h-8',
  large: 'text-400 leading-400 px-m py-s gap-s min-h-10',
};

export const Nav = forwardRef<HTMLElement, NavProps>(
  ({ size = 'medium', className, children, ...props }, ref) => {
    return (
      <NavContext.Provider value={{ size }}>
        <nav
          ref={ref}
          className={cn('flex flex-col gap-xxs', className)}
          {...props}
        >
          {children}
        </nav>
      </NavContext.Provider>
    );
  },
);

Nav.displayName = 'Nav';

export const NavItem = forwardRef<HTMLElement, NavItemProps>(
  (
    { value, icon, selected = false, href, onClick, className, children, ...props },
    ref,
  ) => {
    const { size } = useContext(NavContext);

    const classes = cn(
      'inline-flex items-center rounded-medium transition-colors duration-fast cursor-pointer outline-none relative',
      'text-neutral-foreground-2 hover:bg-subtle-background-hover',
      'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
      'active:bg-subtle-background-pressed',
      sizeStyles[size],
      selected &&
        'text-brand-foreground-1 bg-brand-background-2 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[2px] before:bg-brand-stroke-1 before:rounded-full',
      className,
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          onClick={onClick}
          aria-current={selected ? 'page' : undefined}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {icon && <span className="shrink-0">{icon}</span>}
          <span className="flex-1">{children}</span>
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        onClick={onClick}
        aria-current={selected ? 'page' : undefined}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1">{children}</span>
      </button>
    );
  },
);

NavItem.displayName = 'NavItem';
