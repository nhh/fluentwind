import { forwardRef, useRef, useMemo, useCallback, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '../../utils/cn';
import type { DataGridProps, RowId } from './DataGrid.types';
import { DataGridHeader } from './DataGridHeader';
import { DataGridRow } from './DataGridRow';
import { DataGridFooter } from './DataGridFooter';
import { useDataGridSelection } from './useDataGridSelection';
import { useDataGridSort } from './useDataGridSort';
import { useDataGridKeyboard } from './useDataGridKeyboard';

export const DataGrid = forwardRef<HTMLDivElement, DataGridProps>(
  (props, ref) => {
    const {
      columns,
      rows,
      getRowId,
      height,
      rowHeight = 36,
      overscan = 10,
      selectionMode = 'multiple',
      selectedRows: controlledSelectedRows,
      defaultSelectedRows,
      onSelectionChange,
      sortState: controlledSortState,
      defaultSortState,
      onSortChange,
      size = 'medium',
      striped = true,
      bordered = true,
      showFooter = true,
      dragSelection: dragSelectionProp,
      className,
      ...restProps
    } = props;

    const dragSelection = dragSelectionProp ?? selectionMode === 'multiple';
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Memoize grid template
    const gridTemplate = useMemo(
      () => columns.map((c) => c.width ?? '1fr').join(' '),
      [columns],
    );

    // Memoize getRowId by index
    const getRowIdByIndex = useCallback(
      (index: number) => getRowId(rows[index], index),
      [rows, getRowId],
    );

    // Hooks
    const selection = useDataGridSelection({
      selectionMode,
      rowCount: rows.length,
      getRowId: getRowIdByIndex,
      selectedRows: controlledSelectedRows,
      defaultSelectedRows,
      onSelectionChange,
    });

    const sort = useDataGridSort({
      sortState: controlledSortState,
      defaultSortState,
      onSortChange,
    });

    // Virtualizer
    const rowVirtualizer = useVirtualizer({
      count: rows.length,
      getScrollElement: () => scrollContainerRef.current,
      estimateSize: () => rowHeight,
      overscan,
    });

    // Compute page size for keyboard nav
    const containerHeight = typeof height === 'number' ? height : 400;
    const pageSize = Math.max(
      1,
      Math.floor(containerHeight / rowHeight) - 1,
    );

    const keyboard = useDataGridKeyboard({
      rowCount: rows.length,
      selectionMode,
      scrollToIndex: (index) =>
        rowVirtualizer.scrollToIndex(index, { align: 'auto' }),
      selectRange: selection.selectRange,
      toggleRow: selection.toggleRow,
      handleSelectAll: selection.handleSelectAll,
      clearSelection: selection.clearSelection,
      anchorIndex: selection.anchorIndex,
      setAnchorIndex: selection.setAnchorIndex,
      pageSize,
    });

    // Event delegation for drag selection
    const handleBodyMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!dragSelection || selectionMode === 'none') return;
        const container = scrollContainerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollTop = container.scrollTop;
        const y = e.clientY - rect.top + scrollTop;
        const rowIndex = Math.min(
          Math.max(0, Math.floor(y / rowHeight)),
          rows.length - 1,
        );

        selection.handleRowMouseDown(rowIndex, {
          ctrlKey: e.ctrlKey,
          metaKey: e.metaKey,
          shiftKey: e.shiftKey,
        });
        keyboard.setFocusedIndex(rowIndex);
      },
      [dragSelection, selectionMode, rowHeight, rows.length, selection, keyboard],
    );

    // Window-level mousemove/mouseup for drag
    useEffect(() => {
      if (!selection.isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const scrollTop = container.scrollTop;
        const y = e.clientY - rect.top + scrollTop;
        const rowIndex = Math.min(
          Math.max(0, Math.floor(y / rowHeight)),
          rows.length - 1,
        );
        selection.handleDragMove(rowIndex);

        // Auto-scroll when dragging near edges
        const edgeZone = 40;
        if (e.clientY < rect.top + edgeZone) {
          container.scrollTop -= 20;
        } else if (e.clientY > rect.bottom - edgeZone) {
          container.scrollTop += 20;
        }
      };

      const handleMouseUp = () => {
        selection.handleDragEnd();
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [selection.isDragging, rowHeight, rows.length, selection]);

    const virtualRows = rowVirtualizer.getVirtualItems();
    const totalSize = rowVirtualizer.getTotalSize();
    const multiSelected = selection.selected.size > 1;

    return (
      <div
        ref={ref}
        role="grid"
        aria-rowcount={rows.length + 1}
        aria-multiselectable={selectionMode === 'multiple' || undefined}
        aria-label={restProps['aria-label']}
        aria-labelledby={restProps['aria-labelledby']}
        tabIndex={0}
        onKeyDown={keyboard.handleKeyDown}
        className={cn(
          'relative border border-neutral-stroke-2 rounded-medium bg-neutral-background-1 text-neutral-foreground-1 outline-none',
          'focus-visible:outline-none',
          selection.isDragging && 'select-none',
          className,
        )}
        {...restProps}
      >
        <DataGridHeader
          columns={columns}
          gridTemplate={gridTemplate}
          size={size}
          onHeaderClick={sort.handleHeaderClick}
          getSortDirection={sort.getSortDirection}
        />

        <div
          ref={scrollContainerRef}
          onMouseDown={handleBodyMouseDown}
          className="overflow-y-auto"
          style={{ height }}
        >
          <div className="relative w-full" style={{ height: totalSize }}>
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              const rowId = getRowIdByIndex(virtualRow.index);
              return (
                <DataGridRow
                  key={rowId}
                  row={row}
                  rowIndex={virtualRow.index}
                  rowId={rowId}
                  columns={columns}
                  gridTemplate={gridTemplate}
                  selected={selection.isSelected(rowId)}
                  focused={keyboard.focusedIndex === virtualRow.index}
                  striped={striped && virtualRow.index % 2 === 1}
                  multiSelected={multiSelected}
                  bordered={bordered}
                  size={size}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: virtualRow.size,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {showFooter && (
          <DataGridFooter
            totalRows={rows.length}
            selectedCount={selection.selected.size}
            size={size}
          />
        )}
      </div>
    );
  },
);

DataGrid.displayName = 'DataGrid';
