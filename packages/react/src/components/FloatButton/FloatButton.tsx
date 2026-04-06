import { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { FloatButtonProps, FloatButtonGroupProps } from './FloatButton.types';

const floatButtonVariants = cva(
  'inline-flex items-center justify-center h-10 w-10 cursor-pointer transition-all duration-fast outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
  {
    variants: {
      type: {
        default:
          'bg-neutral-background-1 text-neutral-foreground-1 border border-neutral-stroke-1 shadow-8 hover:shadow-16 hover:bg-neutral-background-1-hover active:bg-neutral-background-1-pressed',
        primary:
          'bg-brand-background text-neutral-foreground-on-brand border border-transparent shadow-8 hover:shadow-16 hover:bg-brand-background-hover active:bg-brand-background-pressed',
      },
      shape: {
        circle: 'rounded-circular',
        square: 'rounded-medium',
      },
    },
    defaultVariants: {
      type: 'default',
      shape: 'circle',
    },
  },
);

export const FloatButton = forwardRef<HTMLButtonElement, FloatButtonProps>(
  (
    {
      icon,
      tooltip,
      type = 'default',
      shape = 'circle',
      href,
      target,
      badge,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(floatButtonVariants({ type, shape }), className);
    const ariaLabel = tooltip ? String(tooltip) : undefined;
    const content = (
      <>
        {icon && <span className="inline-flex items-center justify-center text-[20px]">{icon}</span>}
        {children}
      </>
    );

    const inner = href ? (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} target={target} className={classes} aria-label={ariaLabel} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    ) : (
      <button ref={ref} type="button" className={classes} aria-label={ariaLabel} {...props}>
        {content}
      </button>
    );

    return (
      <div className="relative inline-flex">
        {inner}

        {badge && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-xxs text-100 leading-100 font-semibold rounded-circular bg-status-danger-background text-neutral-foreground-static-inverted">
            {badge}
          </span>
        )}

        {tooltip && (
          <span className="sr-only">{tooltip}</span>
        )}
      </div>
    );
  },
);

FloatButton.displayName = 'FloatButton';

const plusSvg = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 4V16M4 10H16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const closeSvg = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 5L15 15M15 5L5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FloatButtonGroup = forwardRef<HTMLDivElement, FloatButtonGroupProps>(
  (
    {
      trigger = 'click',
      open: controlledOpen,
      onOpenChange,
      icon,
      shape = 'circle',
      type = 'default',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const containerRef = useRef<HTMLDivElement>(null);

    const setOpen = useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setInternalOpen(value);
        }
        onOpenChange?.(value);
      },
      [isControlled, onOpenChange],
    );

    const handleTriggerClick = useCallback(() => {
      if (trigger === 'click') {
        setOpen(!isOpen);
      }
    }, [trigger, isOpen, setOpen]);

    const handleMouseEnter = useCallback(() => {
      if (trigger === 'hover') {
        setOpen(true);
      }
    }, [trigger, setOpen]);

    const handleMouseLeave = useCallback(() => {
      if (trigger === 'hover') {
        setOpen(false);
      }
    }, [trigger, setOpen]);

    // Close on outside click for click trigger
    useEffect(() => {
      if (trigger !== 'click' || !isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [trigger, isOpen, setOpen]);

    return (
      <div
        ref={ref}
        className={cn('fixed bottom-6 right-6 z-50', className)}
        {...props}
      >
        <div
          ref={containerRef}
          className="flex flex-col-reverse items-center gap-s"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main trigger button */}
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close actions' : 'Open actions'}
            className={cn(
              floatButtonVariants({ type, shape }),
              'transition-transform duration-normal',
            )}
            onClick={handleTriggerClick}
          >
            <span
              className={cn(
                'inline-flex items-center justify-center transition-transform duration-normal',
                isOpen && 'rotate-45',
              )}
            >
              {icon || (isOpen ? closeSvg : plusSvg)}
            </span>
          </button>

          {/* Children float buttons */}
          <div
            className={cn(
              'flex flex-col-reverse items-center gap-s transition-all duration-normal',
              isOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-2 pointer-events-none',
            )}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);

FloatButtonGroup.displayName = 'FloatButtonGroup';
