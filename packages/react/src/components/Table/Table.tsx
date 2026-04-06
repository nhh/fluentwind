import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type {
  TableProps,
  TableHeaderProps,
  TableHeaderCellProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableSelectionCellProps,
} from './Table.types';

// --- Table ---

const tableVariants = cva(
  'w-full border-collapse text-neutral-foreground-1',
  {
    variants: {
      size: {
        'extra-small': 'text-200',
        small: 'text-200',
        medium: 'text-300',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ size = 'medium', sortable, noNativeElements, className, children, ...props }, ref) => {
    return (
      <table
        ref={ref}
        role="grid"
        className={cn(tableVariants({ size }), className)}
        {...props}
      >
        {children}
      </table>
    );
  },
);

Table.displayName = 'Table';

// --- TableHeader ---

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn('border-b border-neutral-stroke-2', className)}
        {...props}
      >
        {children}
      </thead>
    );
  },
);

TableHeader.displayName = 'TableHeader';

// --- TableHeaderCell ---

const headerCellVariants = cva(
  'text-left font-semibold text-neutral-foreground-2 px-m select-none',
  {
    variants: {
      sortable: {
        true: 'cursor-pointer hover:bg-subtle-background-hover transition-colors duration-fast',
        false: '',
      },
    },
    defaultVariants: {
      sortable: false,
    },
  },
);

const SortAscIcon = () => (
  <svg className="h-3 w-3 ml-xs inline-block" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M6 2.5l3.5 4h-7L6 2.5z" />
  </svg>
);

const SortDescIcon = () => (
  <svg className="h-3 w-3 ml-xs inline-block" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M6 9.5l-3.5-4h7L6 9.5z" />
  </svg>
);

const SortUnsortedIcon = () => (
  <svg className="h-3 w-3 ml-xs inline-block opacity-40" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M6 1.5l3 3.5H3L6 1.5zM6 10.5L3 7h6l-3 3.5z" />
  </svg>
);

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ sortDirection, sortable, className, children, ...props }, ref) => {
    const ariaSort = sortDirection
      ? sortDirection
      : sortable
        ? ('none' as const)
        : undefined;

    return (
      <th
        ref={ref}
        aria-sort={ariaSort}
        className={cn(
          headerCellVariants({ sortable: sortable ?? false }),
          'py-s',
          className,
        )}
        {...props}
      >
        <span className="inline-flex items-center">
          {children}
          {sortable && (
            sortDirection === 'ascending'
              ? <SortAscIcon />
              : sortDirection === 'descending'
                ? <SortDescIcon />
                : <SortUnsortedIcon />
          )}
        </span>
      </th>
    );
  },
);

TableHeaderCell.displayName = 'TableHeaderCell';

// --- TableBody ---

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody ref={ref} className={cn('divide-y divide-neutral-stroke-2', className)} {...props}>
        {children}
      </tbody>
    );
  },
);

TableBody.displayName = 'TableBody';

// --- TableRow ---

const tableRowVariants = cva(
  'transition-colors duration-fast',
  {
    variants: {
      appearance: {
        none: 'hover:bg-subtle-background-hover',
        brand: 'bg-brand-background-2 hover:bg-brand-background-2-hover text-brand-foreground-2',
      },
    },
    defaultVariants: {
      appearance: 'none',
    },
  },
);

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ appearance = 'none', className, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(tableRowVariants({ appearance }), className)}
        {...props}
      >
        {children}
      </tr>
    );
  },
);

TableRow.displayName = 'TableRow';

// --- TableCell ---

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn('px-m py-s text-300 leading-300', className)}
        {...props}
      >
        {children}
      </td>
    );
  },
);

TableCell.displayName = 'TableCell';

// --- TableSelectionCell ---

export const TableSelectionCell = forwardRef<HTMLTableCellElement, TableSelectionCellProps>(
  ({ checked, onChange, type = 'checkbox', className, ...props }, ref) => {
    const isChecked = checked === true;
    const isMixed = checked === 'mixed';

    return (
      <td
        ref={ref}
        className={cn('w-11 px-m py-s text-center', className)}
        {...props}
      >
        <input
          type={type}
          checked={isChecked}
          ref={undefined}
          aria-checked={isMixed ? 'mixed' : isChecked}
          onChange={(e) => onChange?.(e.target.checked)}
          className={cn(
            'appearance-none cursor-pointer border border-neutral-stroke-accessible transition-colors duration-fast',
            'h-4 w-4',
            type === 'checkbox' ? 'rounded-small' : 'rounded-circular',
            'checked:bg-brand-background checked:border-brand-background',
            'hover:border-neutral-stroke-accessible-hover',
            'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
          )}
        />
      </td>
    );
  },
);

TableSelectionCell.displayName = 'TableSelectionCell';
