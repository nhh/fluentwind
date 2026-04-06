import { useState, useCallback, type KeyboardEvent } from 'react';
import type { SelectionMode } from './DataGrid.types';

export interface UseDataGridKeyboardOptions {
  rowCount: number;
  selectionMode: SelectionMode;
  scrollToIndex: (index: number) => void;
  selectRange: (from: number, to: number, additive: boolean) => void;
  toggleRow: (rowIndex: number) => void;
  handleSelectAll: () => void;
  clearSelection: () => void;
  anchorIndex: number;
  setAnchorIndex: (index: number) => void;
  pageSize: number;
}

export interface UseDataGridKeyboardReturn {
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function useDataGridKeyboard(
  options: UseDataGridKeyboardOptions,
): UseDataGridKeyboardReturn {
  const {
    rowCount,
    selectionMode,
    scrollToIndex,
    selectRange,
    toggleRow,
    handleSelectAll,
    clearSelection,
    anchorIndex,
    setAnchorIndex,
    getRowId,
    onSelectionChange,
    pageSize,
  } = options;

  const [focusedIndex, setFocusedIndex] = useState(0);

  const moveFocus = useCallback(
    (nextIndex: number, shiftKey: boolean) => {
      const clamped = clamp(nextIndex, 0, rowCount - 1);
      setFocusedIndex(clamped);
      scrollToIndex(clamped);

      if (selectionMode === 'none') return;

      if (shiftKey && selectionMode === 'multiple') {
        selectRange(anchorIndex, clamped, false);
      } else {
        // Plain move: select only the focused row via selectRange (single row range)
        selectRange(clamped, clamped, false);
        setAnchorIndex(clamped);
      }
    },
    [
      rowCount,
      selectionMode,
      scrollToIndex,
      selectRange,
      anchorIndex,
      setAnchorIndex,
    ],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (rowCount === 0) return;

      const { key, shiftKey, ctrlKey, metaKey } = e;
      const isModifier = ctrlKey || metaKey;

      switch (key) {
        case 'ArrowDown': {
          e.preventDefault();
          moveFocus(focusedIndex + 1, shiftKey);
          break;
        }

        case 'ArrowUp': {
          e.preventDefault();
          moveFocus(focusedIndex - 1, shiftKey);
          break;
        }

        case 'PageDown': {
          e.preventDefault();
          moveFocus(focusedIndex + pageSize, shiftKey);
          break;
        }

        case 'PageUp': {
          e.preventDefault();
          moveFocus(focusedIndex - pageSize, shiftKey);
          break;
        }

        case 'Home': {
          e.preventDefault();
          moveFocus(0, shiftKey);
          break;
        }

        case 'End': {
          e.preventDefault();
          moveFocus(rowCount - 1, shiftKey);
          break;
        }

        case ' ':
        case 'Enter': {
          e.preventDefault();
          if (selectionMode !== 'none') {
            toggleRow(focusedIndex);
          }
          break;
        }

        case 'a':
        case 'A': {
          if (isModifier && selectionMode === 'multiple') {
            e.preventDefault();
            handleSelectAll();
          }
          break;
        }

        case 'Escape': {
          e.preventDefault();
          clearSelection();
          break;
        }

        default:
          break;
      }
    },
    [
      rowCount,
      focusedIndex,
      pageSize,
      selectionMode,
      moveFocus,
      toggleRow,
      handleSelectAll,
      clearSelection,
    ],
  );

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
  };
}
