import { useState, useCallback, useRef } from 'react';
import type { RowId, SelectionMode } from './DataGrid.types';

export interface UseDataGridSelectionOptions {
  selectionMode: SelectionMode;
  rowCount: number;
  getRowId: (index: number) => RowId;
  selectedRows?: Set<RowId>;
  defaultSelectedRows?: Set<RowId>;
  onSelectionChange?: (selected: Set<RowId>) => void;
}

export interface UseDataGridSelectionReturn {
  selected: Set<RowId>;
  isSelected: (rowId: RowId) => boolean;
  handleRowMouseDown: (
    rowIndex: number,
    event: { ctrlKey: boolean; metaKey: boolean; shiftKey: boolean },
  ) => void;
  handleSelectAll: () => void;
  clearSelection: () => void;
  handleDragMove: (rowIndex: number) => void;
  handleDragEnd: () => void;
  isDragging: boolean;
  anchorIndex: number;
  setAnchorIndex: (index: number) => void;
  selectRange: (from: number, to: number, additive: boolean) => void;
  toggleRow: (rowIndex: number) => void;
}

const EMPTY_SET = new Set<RowId>();

export function useDataGridSelection(
  options: UseDataGridSelectionOptions,
): UseDataGridSelectionReturn {
  const {
    selectionMode,
    rowCount,
    getRowId,
    selectedRows: controlledSelected,
    defaultSelectedRows,
    onSelectionChange,
  } = options;

  const isControlled = controlledSelected !== undefined;

  const [internalSelected, setInternalSelected] = useState<Set<RowId>>(
    () => defaultSelectedRows ?? new Set(),
  );

  const selected = isControlled ? controlledSelected : internalSelected;

  const [anchorIndex, setAnchorIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartIndexRef = useRef<number>(-1);
  const preSelectSnapshotRef = useRef<Set<RowId>>(new Set());

  const updateSelection = useCallback(
    (next: Set<RowId>) => {
      if (!isControlled) {
        setInternalSelected(next);
      }
      onSelectionChange?.(next);
    },
    [isControlled, onSelectionChange],
  );

  const isSelected = useCallback(
    (rowId: RowId): boolean => selected.has(rowId),
    [selected],
  );

  const buildRangeSet = useCallback(
    (from: number, to: number): Set<RowId> => {
      const min = Math.min(from, to);
      const max = Math.max(from, to);
      const ids = new Set<RowId>();
      for (let i = min; i <= max; i++) {
        ids.add(getRowId(i));
      }
      return ids;
    },
    [getRowId],
  );

  const selectRange = useCallback(
    (from: number, to: number, additive: boolean) => {
      if (selectionMode === 'none') return;

      const rangeIds = buildRangeSet(from, to);

      if (additive && selectionMode === 'multiple') {
        const next = new Set(selected);
        for (const id of rangeIds) {
          next.add(id);
        }
        updateSelection(next);
      } else {
        updateSelection(rangeIds);
      }
    },
    [selectionMode, selected, buildRangeSet, updateSelection],
  );

  const toggleRow = useCallback(
    (rowIndex: number) => {
      if (selectionMode === 'none') return;

      const rowId = getRowId(rowIndex);

      if (selectionMode === 'single') {
        if (selected.has(rowId)) {
          updateSelection(new Set());
        } else {
          updateSelection(new Set([rowId]));
        }
        return;
      }

      // multiple
      const next = new Set(selected);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      updateSelection(next);
    },
    [selectionMode, selected, getRowId, updateSelection],
  );

  const handleRowMouseDown = useCallback(
    (
      rowIndex: number,
      event: { ctrlKey: boolean; metaKey: boolean; shiftKey: boolean },
    ) => {
      if (selectionMode === 'none') return;

      const { ctrlKey, metaKey, shiftKey } = event;
      const isModifier = ctrlKey || metaKey;

      if (shiftKey && selectionMode === 'multiple') {
        // Shift+Click: select range from anchor to this row
        selectRange(anchorIndex, rowIndex, isModifier);
      } else if (isModifier && selectionMode === 'multiple') {
        // Ctrl/Cmd+Click: toggle this row
        toggleRow(rowIndex);
        setAnchorIndex(rowIndex);
      } else {
        // Plain click: clear all, select this row
        const rowId = getRowId(rowIndex);
        updateSelection(new Set([rowId]));
        setAnchorIndex(rowIndex);
      }

      // Start drag tracking
      dragStartIndexRef.current = rowIndex;
      // Snapshot current selection before drag mutations
      if (isModifier && selectionMode === 'multiple') {
        // For Ctrl+drag, snapshot includes the toggled state
        const rowId = getRowId(rowIndex);
        const snapshot = new Set(selected);
        if (snapshot.has(rowId)) {
          snapshot.delete(rowId);
        } else {
          snapshot.add(rowId);
        }
        preSelectSnapshotRef.current = snapshot;
      } else if (shiftKey && selectionMode === 'multiple') {
        preSelectSnapshotRef.current = new Set(selected);
      } else {
        preSelectSnapshotRef.current = new Set();
      }
      setIsDragging(true);
    },
    [
      selectionMode,
      anchorIndex,
      selected,
      getRowId,
      selectRange,
      toggleRow,
      updateSelection,
    ],
  );

  const handleDragMove = useCallback(
    (rowIndex: number) => {
      if (!isDragging || selectionMode === 'none') return;
      if (dragStartIndexRef.current < 0) return;

      const rangeIds = buildRangeSet(dragStartIndexRef.current, rowIndex);
      const next = new Set(preSelectSnapshotRef.current);
      for (const id of rangeIds) {
        next.add(id);
      }
      updateSelection(next);
    },
    [isDragging, selectionMode, buildRangeSet, updateSelection],
  );

  const handleDragEnd = useCallback(() => {
    dragStartIndexRef.current = -1;
    preSelectSnapshotRef.current = new Set();
    setIsDragging(false);
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectionMode !== 'multiple') return;

    // If all rows are already selected, deselect all
    if (selected.size === rowCount) {
      updateSelection(new Set());
      return;
    }

    const allIds = new Set<RowId>();
    for (let i = 0; i < rowCount; i++) {
      allIds.add(getRowId(i));
    }
    updateSelection(allIds);
  }, [selectionMode, rowCount, selected.size, getRowId, updateSelection]);

  const clearSelection = useCallback(() => {
    if (selectionMode === 'none') return;
    updateSelection(new Set());
  }, [selectionMode, updateSelection]);

  if (selectionMode === 'none') {
    return {
      selected: EMPTY_SET,
      isSelected: () => false,
      handleRowMouseDown: () => {},
      handleSelectAll: () => {},
      clearSelection: () => {},
      handleDragMove: () => {},
      handleDragEnd: () => {},
      isDragging: false,
      anchorIndex: 0,
      setAnchorIndex: () => {},
      selectRange: () => {},
      toggleRow: () => {},
    };
  }

  return {
    selected,
    isSelected,
    handleRowMouseDown,
    handleSelectAll,
    clearSelection,
    handleDragMove,
    handleDragEnd,
    isDragging,
    anchorIndex,
    setAnchorIndex,
    selectRange,
    toggleRow,
  };
}
