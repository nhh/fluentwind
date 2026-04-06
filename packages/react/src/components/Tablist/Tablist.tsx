import { forwardRef, createContext, useContext, Children, isValidElement, type KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import type { TablistProps, TabProps } from './Tablist.types';

interface TablistContextValue {
  selectedValue?: string;
  onTabSelect?: (value: string) => void;
  size: 'small' | 'medium' | 'large';
  appearance: 'transparent' | 'subtle';
  vertical: boolean;
}

const TablistContext = createContext<TablistContextValue>({
  size: 'medium',
  appearance: 'transparent',
  vertical: false,
});

export const Tablist = forwardRef<HTMLDivElement, TablistProps>(
  (
    {
      selectedValue,
      onTabSelect,
      size = 'medium',
      appearance = 'transparent',
      vertical = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const getTabValues = (): string[] => {
      const values: string[] = [];
      Children.forEach(children, (child) => {
        if (isValidElement<{ value: string; disabled?: boolean }>(child) && !child.props.disabled) {
          values.push(child.props.value);
        }
      });
      return values;
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const tabValues = getTabValues();
      if (tabValues.length === 0) return;

      const currentIndex = selectedValue ? tabValues.indexOf(selectedValue) : -1;
      let nextIndex: number | null = null;

      const forward = vertical ? 'ArrowDown' : 'ArrowRight';
      const backward = vertical ? 'ArrowUp' : 'ArrowLeft';

      if (e.key === forward || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = currentIndex < tabValues.length - 1 ? currentIndex + 1 : 0;
      } else if (e.key === backward || e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabValues.length - 1;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = tabValues.length - 1;
      }

      if (nextIndex !== null) {
        onTabSelect?.(tabValues[nextIndex]);
      }
    };

    return (
      <TablistContext.Provider
        value={{ selectedValue, onTabSelect, size, appearance, vertical }}
      >
        <div
          ref={ref}
          role="tablist"
          aria-orientation={vertical ? 'vertical' : 'horizontal'}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex',
            vertical ? 'flex-col' : 'flex-row',
            appearance === 'subtle' && 'bg-subtle-background rounded-medium',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TablistContext.Provider>
    );
  },
);

Tablist.displayName = 'Tablist';

const sizeStyles: Record<string, string> = {
  small: 'text-200 leading-200 px-s py-s gap-xs',
  medium: 'text-300 leading-300 px-m py-m gap-xs',
  large: 'text-400 leading-400 px-m py-l gap-s',
};

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, icon, disabled, className, children, ...props }, ref) => {
    const { selectedValue, onTabSelect, size, vertical } = useContext(TablistContext);
    const isSelected = selectedValue === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        disabled={disabled}
        tabIndex={isSelected ? 0 : -1}
        className={cn(
          'inline-flex items-center font-semibold transition-colors duration-fast cursor-pointer outline-none relative',
          'text-neutral-foreground-2 hover:text-neutral-foreground-1',
          'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
          sizeStyles[size],
          isSelected && 'text-brand-foreground-1',
          !vertical &&
            isSelected &&
            'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand-stroke-1 after:rounded-circular',
          vertical &&
            isSelected &&
            'after:absolute after:left-0 after:top-0 after:bottom-0 after:w-[2px] after:bg-brand-stroke-1 after:rounded-circular',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        onClick={() => !disabled && onTabSelect?.(value)}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  },
);

Tab.displayName = 'Tab';
