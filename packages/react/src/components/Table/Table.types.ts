import type { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, ReactNode } from 'react';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  size?: 'extra-small' | 'small' | 'medium';
  sortable?: boolean;
  noNativeElements?: boolean;
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortDirection?: 'ascending' | 'descending';
  sortable?: boolean;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  appearance?: 'none' | 'brand';
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}

export interface TableSelectionCellProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'onChange'> {
  checked?: boolean | 'mixed';
  onChange?: (checked: boolean) => void;
  type?: 'checkbox' | 'radio';
}
