import type { ReactNode, HTMLAttributes } from 'react';

export type RowId = string | number;
export type SortDirection = 'ascending' | 'descending';
export type SelectionMode = 'none' | 'single' | 'multiple';

export interface DataGridColumn<TRow = any> {
  key: string;
  header: ReactNode;
  width?: string;
  renderCell?: (row: TRow, rowIndex: number) => ReactNode;
  sortable?: boolean;
  align?: 'start' | 'center' | 'end';
}

export interface DataGridSortState {
  columnKey: string;
  direction: SortDirection;
}

export interface DataGridProps<TRow = any>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  columns: DataGridColumn<TRow>[];
  rows: TRow[];
  getRowId: (row: TRow, index: number) => RowId;
  height: number | string;
  rowHeight?: number;
  overscan?: number;
  selectionMode?: SelectionMode;
  selectedRows?: Set<RowId>;
  defaultSelectedRows?: Set<RowId>;
  onSelectionChange?: (selectedRows: Set<RowId>) => void;
  sortState?: DataGridSortState | null;
  defaultSortState?: DataGridSortState | null;
  onSortChange?: (sortState: DataGridSortState | null) => void;
  size?: 'small' | 'medium';
  striped?: boolean;
  bordered?: boolean;
  showFooter?: boolean;
  dragSelection?: boolean;
}
