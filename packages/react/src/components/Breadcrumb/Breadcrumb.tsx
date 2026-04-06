import { forwardRef, Children, createContext, useContext, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import type { BreadcrumbProps, BreadcrumbItemProps } from './Breadcrumb.types';

interface BreadcrumbContextValue {
  size: 'small' | 'medium' | 'large';
}

const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  size: 'medium',
});

const sizeStyles: Record<string, string> = {
  small: 'text-200 leading-200',
  medium: 'text-300 leading-300',
  large: 'text-400 leading-400',
};

const ChevronDivider = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className="shrink-0 text-neutral-foreground-3"
    aria-hidden="true"
  >
    <path
      d="M4.5 2.5L8 6L4.5 9.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SlashDivider = () => (
  <span className="text-neutral-foreground-3" aria-hidden="true">
    /
  </span>
);

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      size = 'medium',
      dividerType = 'chevron',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const items = Children.toArray(children);
    const Divider = dividerType === 'chevron' ? ChevronDivider : SlashDivider;

    return (
      <BreadcrumbContext.Provider value={{ size }}>
        <nav
          ref={ref}
          aria-label="breadcrumb"
          className={cn('flex items-center gap-xs', sizeStyles[size], className)}
          {...props}
        >
          {items.map((child, index) => (
            <span key={index} className="inline-flex items-center gap-xs">
              {index > 0 && <Divider />}
              {child}
            </span>
          ))}
        </nav>
      </BreadcrumbContext.Provider>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbItem = forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  ({ current = false, className, children, ...props }, ref) => {
    const { size } = useContext(BreadcrumbContext);

    if (current) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          aria-current="page"
          className={cn(
            'font-semibold text-neutral-foreground-1',
            sizeStyles[size],
            className,
          )}
        >
          {children}
        </span>
      );
    }

    return (
      <a
        ref={ref}
        className={cn(
          'text-neutral-foreground-2 hover:text-neutral-foreground-1 transition-colors duration-fast underline-offset-2 hover:underline cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 rounded-small',
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
