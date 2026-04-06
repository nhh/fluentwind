import { useState, useCallback } from 'react';
import type { DataGridSortState, SortDirection } from './DataGrid.types';

export interface UseDataGridSortOptions {
  sortState?: DataGridSortState | null;
  defaultSortState?: DataGridSortState | null;
  onSortChange?: (state: DataGridSortState | null) => void;
}

export interface UseDataGridSortReturn {
  sortState: DataGridSortState | null;
  handleHeaderClick: (columnKey: string) => void;
  getSortDirection: (columnKey: string) => SortDirection | undefined;
}

export function useDataGridSort(
  options: UseDataGridSortOptions,
): UseDataGridSortReturn {
  const {
    sortState: controlledSortState,
    defaultSortState,
    onSortChange,
  } = options;

  const isControlled = controlledSortState !== undefined;

  const [internalSortState, setInternalSortState] =
    useState<DataGridSortState | null>(() => defaultSortState ?? null);

  const sortState = isControlled ? (controlledSortState ?? null) : internalSortState;

  const updateSortState = useCallback(
    (next: DataGridSortState | null) => {
      if (!isControlled) {
        setInternalSortState(next);
      }
      onSortChange?.(next);
    },
    [isControlled, onSortChange],
  );

  const handleHeaderClick = useCallback(
    (columnKey: string) => {
      if (sortState === null || sortState.columnKey !== columnKey) {
        // Different column or no current sort: set ascending
        updateSortState({ columnKey, direction: 'ascending' });
      } else if (sortState.direction === 'ascending') {
        // Same column, ascending -> descending
        updateSortState({ columnKey, direction: 'descending' });
      } else {
        // Same column, descending -> clear
        updateSortState(null);
      }
    },
    [sortState, updateSortState],
  );

  const getSortDirection = useCallback(
    (columnKey: string): SortDirection | undefined => {
      if (sortState !== null && sortState.columnKey === columnKey) {
        return sortState.direction;
      }
      return undefined;
    },
    [sortState],
  );

  return {
    sortState,
    handleHeaderClick,
    getSortDirection,
  };
}
