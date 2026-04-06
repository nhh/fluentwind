import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import type { ScrollAreaProps } from './ScrollArea.types';

const scrollbarStyles = (id: string, type: 'auto' | 'always' | 'hover' | 'scroll') => `
  .fw-scroll-${id} {
    scrollbar-width: thin;
    scrollbar-color: var(--neutral-foreground-4) var(--neutral-background-3);
  }
  .fw-scroll-${id}::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .fw-scroll-${id}::-webkit-scrollbar-track {
    background: var(--neutral-background-3);
  }
  .fw-scroll-${id}::-webkit-scrollbar-thumb {
    background: var(--neutral-foreground-4);
    border-radius: 9999px;
  }
  .fw-scroll-${id}::-webkit-scrollbar-thumb:hover {
    background: var(--neutral-foreground-3);
  }
  ${
    type === 'hover'
      ? `
  .fw-scroll-${id} {
    scrollbar-color: transparent transparent;
  }
  .fw-scroll-${id}::-webkit-scrollbar-thumb {
    background: transparent;
  }
  .fw-scroll-${id}::-webkit-scrollbar-track {
    background: transparent;
  }
  .fw-scroll-${id}:hover {
    scrollbar-color: var(--neutral-foreground-4) var(--neutral-background-3);
  }
  .fw-scroll-${id}:hover::-webkit-scrollbar-thumb {
    background: var(--neutral-foreground-4);
  }
  .fw-scroll-${id}:hover::-webkit-scrollbar-track {
    background: var(--neutral-background-3);
  }
  `
      : ''
  }
  ${
    type === 'scroll'
      ? `
  .fw-scroll-${id} {
    scrollbar-color: transparent transparent;
  }
  .fw-scroll-${id}::-webkit-scrollbar-thumb {
    background: transparent;
  }
  .fw-scroll-${id}::-webkit-scrollbar-track {
    background: transparent;
  }
  .fw-scroll-${id}:is(:active, .scrolling) {
    scrollbar-color: var(--neutral-foreground-4) var(--neutral-background-3);
  }
  .fw-scroll-${id}:is(:active, .scrolling)::-webkit-scrollbar-thumb {
    background: var(--neutral-foreground-4);
  }
  .fw-scroll-${id}:is(:active, .scrolling)::-webkit-scrollbar-track {
    background: var(--neutral-background-3);
  }
  `
      : ''
  }
`;

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ orientation = 'vertical', type = 'auto', className, children, style, ...props }, ref) => {
    const rawId = useId();
    const id = rawId.replace(/:/g, '');

    const overflowClass =
      orientation === 'vertical'
        ? 'overflow-y-auto overflow-x-hidden'
        : orientation === 'horizontal'
          ? 'overflow-x-auto overflow-y-hidden'
          : 'overflow-auto';

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: scrollbarStyles(id, type) }} />
        <div
          ref={ref}
          className={cn(`fw-scroll-${id}`, overflowClass, className)}
          style={style}
          {...props}
        >
          {children}
        </div>
      </>
    );
  },
);

ScrollArea.displayName = 'ScrollArea';
