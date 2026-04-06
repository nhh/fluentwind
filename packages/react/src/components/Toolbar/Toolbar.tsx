import { forwardRef, createContext, useContext } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { ToolbarProps, ToolbarButtonProps } from './Toolbar.types';

interface ToolbarContextValue {
  size: 'small' | 'medium' | 'large';
}

const ToolbarContext = createContext<ToolbarContextValue>({ size: 'medium' });

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ size = 'medium', vertical = false, className, children, ...props }, ref) => {
    return (
      <ToolbarContext.Provider value={{ size }}>
        <div
          ref={ref}
          role="toolbar"
          aria-orientation={vertical ? 'vertical' : 'horizontal'}
          className={cn(
            'flex items-center gap-xs',
            vertical ? 'flex-col' : 'flex-row',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </ToolbarContext.Provider>
    );
  },
);

Toolbar.displayName = 'Toolbar';

const toolbarButtonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-colors duration-fast cursor-pointer select-none outline-none border border-transparent focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1 rounded-medium',
  {
    variants: {
      appearance: {
        subtle:
          'bg-subtle-background text-neutral-foreground-1 hover:bg-subtle-background-hover active:bg-subtle-background-pressed',
        transparent:
          'bg-transparent-background text-neutral-foreground-1 hover:bg-transparent-background-hover active:bg-transparent-background-pressed',
      },
      size: {
        small: 'text-200 leading-200 gap-xs px-s py-xxs min-h-6',
        medium: 'text-300 leading-300 gap-xs px-s py-xs min-h-8',
        large: 'text-400 leading-400 gap-s px-m py-s min-h-10',
      },
      iconOnly: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { iconOnly: true, size: 'small', className: 'px-xxs' },
      { iconOnly: true, size: 'medium', className: 'px-xs' },
      { iconOnly: true, size: 'large', className: 'px-xs' },
    ],
    defaultVariants: {
      appearance: 'subtle',
      size: 'medium',
      iconOnly: false,
    },
  },
);

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ icon, iconOnly = false, appearance, disabled, className, children, ...props }, ref) => {
    const { size } = useContext(ToolbarContext);

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          toolbarButtonVariants({ appearance, size, iconOnly }),
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {!iconOnly && children}
      </button>
    );
  },
);

ToolbarButton.displayName = 'ToolbarButton';
