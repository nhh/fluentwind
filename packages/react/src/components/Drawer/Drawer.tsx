import { forwardRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import type { DrawerProps } from './Drawer.types';

const sizeClasses = {
  small: 'w-[320px]',
  medium: 'w-[480px]',
  large: 'w-[640px]',
  full: 'w-full',
};

const sizeClassesBottom = {
  small: 'h-[30vh]',
  medium: 'h-[50vh]',
  large: 'h-[70vh]',
  full: 'h-full',
};

const positionClasses = {
  start: 'inset-y-0 left-0',
  end: 'inset-y-0 right-0',
  bottom: 'inset-x-0 bottom-0',
};

const slideIn = {
  start: 'translate-x-0',
  end: 'translate-x-0',
  bottom: 'translate-y-0',
};

const slideOut = {
  start: '-translate-x-full',
  end: 'translate-x-full',
  bottom: 'translate-y-full',
};

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onOpenChange,
      position = 'start',
      size = 'medium',
      type = 'overlay',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // Lock body scroll when overlay is open
    useEffect(() => {
      if (type === 'overlay' && open) {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = prev;
        };
      }
    }, [open, type]);

    const isHorizontal = position === 'start' || position === 'end';

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          onOpenChange(false);
        }
      },
      [onOpenChange],
    );

    const drawerContent = (
      <div
        ref={ref}
        role={type === 'overlay' ? 'dialog' : undefined}
        aria-modal={type === 'overlay' ? true : undefined}
        onKeyDown={handleKeyDown}
        className={cn(
          'bg-neutral-background-1 text-neutral-foreground-1 border-neutral-stroke-1 flex flex-col overflow-auto transition-transform duration-normal',
          type === 'overlay' && 'fixed z-[1000] shadow-64',
          type === 'inline' && 'relative',
          positionClasses[position],
          isHorizontal
            ? cn(sizeClasses[size], position === 'start' ? 'border-r' : 'border-l')
            : cn(sizeClassesBottom[size], 'border-t'),
          open ? slideIn[position] : cn(slideOut[position], 'pointer-events-none'),
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (type === 'inline') {
      if (!open) return null;
      return drawerContent;
    }

    // Overlay type: render in portal
    if (typeof document === 'undefined') return null;

    return createPortal(
      <>
        {/* Backdrop */}
        <div
          className={cn(
            'fixed inset-0 z-[999] bg-black/40 transition-opacity duration-normal',
            open ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
          onClick={() => onOpenChange(false)}
          aria-hidden="true"
        />
        {drawerContent}
      </>,
      document.body,
    );
  },
);

Drawer.displayName = 'Drawer';
