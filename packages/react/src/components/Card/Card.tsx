import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { CardProps } from './Card.types';

const cardVariants = cva(
  'flex transition-colors duration-fast rounded-xlarge',
  {
    variants: {
      appearance: {
        filled:
          'bg-neutral-background-1 shadow-4',
        filledAlternative:
          'bg-neutral-background-2 dark:bg-neutral-background-6 shadow-4',
        outline:
          'bg-neutral-background-1 border border-neutral-stroke-1 shadow-none',
        subtle:
          'bg-subtle-background shadow-none dark:border dark:border-neutral-stroke-2',
      },
      size: {
        small: 'p-s gap-s',
        medium: 'p-m gap-m',
        large: 'p-l gap-l',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
    },
    defaultVariants: {
      appearance: 'filled',
      size: 'medium',
      orientation: 'vertical',
    },
  },
);

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      appearance,
      size,
      orientation,
      selectable = false,
      selected = false,
      onSelectionChange,
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (selectable && onSelectionChange) {
        onSelectionChange(!selected);
      }
      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (selectable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        if (onSelectionChange) {
          onSelectionChange(!selected);
        }
      }
    };

    return (
      <div
        ref={ref}
        role={selectable ? 'button' : undefined}
        tabIndex={selectable ? 0 : undefined}
        aria-selected={selectable ? selected : undefined}
        onKeyDown={selectable ? handleKeyDown : undefined}
        className={cn(
          cardVariants({ appearance, size, orientation }),
          selectable && 'cursor-pointer hover:shadow-8 focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
          selectable && selected && 'ring-2 ring-brand-stroke-1',
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
