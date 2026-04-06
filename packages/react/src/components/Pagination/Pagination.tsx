import { forwardRef, useState, useCallback, useMemo } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { PaginationProps } from './Pagination.types';

// --- Helpers ---

const ELLIPSIS = '...' as const;

function generatePages(
  totalPages: number,
  currentPage: number,
  siblingCount: number,
): (number | typeof ELLIPSIS)[] {
  // Total page numbers to show: first + last + current + 2*siblings + 2 ellipsis slots
  const totalSlots = siblingCount * 2 + 5;

  // If total pages fit in the available slots, show all pages
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = siblingCount * 2 + 3;
    const leftPages = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftPages, ELLIPSIS, totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = siblingCount * 2 + 3;
    const rightPages = Array.from({ length: rightCount }, (_, i) => totalPages - rightCount + i + 1);
    return [1, ELLIPSIS, ...rightPages];
  }

  // Both ellipses
  const middlePages = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i,
  );
  return [1, ELLIPSIS, ...middlePages, ELLIPSIS, totalPages];
}

// --- Variants ---

const pageButtonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-colors duration-fast rounded-medium focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:outline-none',
  {
    variants: {
      size: {
        small: 'h-7 min-w-7 px-xs text-200',
        medium: 'h-8 min-w-8 px-s text-300',
      },
      active: {
        true: 'bg-brand-background text-neutral-foreground-on-brand',
        false: 'text-neutral-foreground-1 hover:bg-subtle-background-hover',
      },
      disabled: {
        true: 'text-neutral-foreground-disabled cursor-not-allowed hover:bg-transparent',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'medium',
      active: false,
      disabled: false,
    },
  },
);

const navButtonVariants = cva(
  'inline-flex items-center justify-center transition-colors duration-fast rounded-medium focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:outline-none',
  {
    variants: {
      size: {
        small: 'h-7 w-7 text-200',
        medium: 'h-8 w-8 text-300',
      },
      disabled: {
        true: 'text-neutral-foreground-disabled cursor-not-allowed',
        false: 'text-neutral-foreground-1 hover:bg-subtle-background-hover cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'medium',
      disabled: false,
    },
  },
);

// --- Icons ---

const ChevronLeftIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 0 1-.02 1.06L8.832 10l3.938 3.71a.75.75 0 1 1-1.04 1.08l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 0 1 1.06.02Z" clipRule="evenodd" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clipRule="evenodd" />
  </svg>
);

// --- Pagination ---

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      totalPages,
      currentPage: controlledPage,
      defaultPage = 1,
      siblingCount = 1,
      onChange,
      size = 'medium',
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);
    const isControlled = controlledPage !== undefined;
    const activePage = isControlled ? controlledPage : uncontrolledPage;

    const pages = useMemo(
      () => generatePages(totalPages, activePage, siblingCount),
      [totalPages, activePage, siblingCount],
    );

    const goToPage = useCallback(
      (page: number) => {
        if (disabled || page < 1 || page > totalPages) return;
        if (!isControlled) {
          setUncontrolledPage(page);
        }
        onChange?.(page);
      },
      [disabled, totalPages, isControlled, onChange],
    );

    const isFirstPage = activePage <= 1;
    const isLastPage = activePage >= totalPages;

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn('inline-flex items-center gap-xs', className)}
        {...props}
      >
        {/* Previous button */}
        <button
          type="button"
          aria-label="Previous page"
          disabled={disabled || isFirstPage}
          onClick={() => goToPage(activePage - 1)}
          className={navButtonVariants({ size, disabled: disabled || isFirstPage })}
        >
          <ChevronLeftIcon />
        </button>

        {/* Page buttons */}
        {pages.map((page, index) => {
          if (page === ELLIPSIS) {
            return (
              <span
                key={`ellipsis-${index}`}
                className={cn(
                  'inline-flex items-center justify-center select-none text-neutral-foreground-3',
                  size === 'small' ? 'h-7 min-w-7 text-200' : 'h-8 min-w-8 text-300',
                )}
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const isActive = page === activePage;

          return (
            <button
              key={page}
              type="button"
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
              disabled={disabled}
              onClick={() => goToPage(page)}
              className={pageButtonVariants({
                size,
                active: isActive,
                disabled,
              })}
            >
              {page}
            </button>
          );
        })}

        {/* Next button */}
        <button
          type="button"
          aria-label="Next page"
          disabled={disabled || isLastPage}
          onClick={() => goToPage(activePage + 1)}
          className={navButtonVariants({ size, disabled: disabled || isLastPage })}
        >
          <ChevronRightIcon />
        </button>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
