import type { CSSProperties } from 'react';
import { memo } from 'react';
import { cn } from '../../utils/cn';
import { DataGridCell } from './DataGridCell';
import type { DataGridColumn, RowId } from './DataGrid.types';

interface DataGridRowProps {
  row: any;
  rowIndex: number;
  rowId: RowId;
  columns: DataGridColumn[];
  gridTemplate: string;
  selected: boolean;
  focused: boolean;
  striped: boolean;
  multiSelected: boolean;
  bordered: boolean;
  size: 'small' | 'medium';
  style: CSSProperties;
}

export const DataGridRow = memo(
  function DataGridRow({
    row,
    rowIndex,
    columns,
    gridTemplate,
    selected,
    focused,
    striped,
    multiSelected,
    bordered,
    size,
    style,
  }: DataGridRowProps) {
    return (
      <div
        role="row"
        aria-rowindex={rowIndex + 2}
        aria-selected={selected}
        style={{ ...style, gridTemplateColumns: gridTemplate }}
        className={cn(
          'absolute top-0 left-0 grid w-full transition-colors duration-fast',
          bordered && !selected && 'border-b border-neutral-stroke-3',
          selected &&
            'bg-brand-background-2 text-neutral-foreground-1 border-l-[3px] border-l-brand-background border-b border-b-brand-stroke-2 hover:bg-brand-background-2-hover',
          !selected && striped && 'bg-neutral-background-2',
          !selected && 'hover:bg-subtle-background-hover',
          focused && !multiSelected && 'ring-2 ring-inset ring-neutral-stroke-focus-2 z-[1]',
        )}
      >
        {columns.map((column, colIndex) => (
          <DataGridCell
            key={column.key}
            align={column.align}
            size={size}
            colIndex={colIndex}
          >
            {column.renderCell?.(row, rowIndex) ?? String(row[column.key] ?? '')}
          </DataGridCell>
        ))}
      </div>
    );
  },
  (prev, next) =>
    prev.row === next.row &&
    prev.selected === next.selected &&
    prev.focused === next.focused &&
    prev.striped === next.striped &&
    prev.multiSelected === next.multiSelected &&
    prev.bordered === next.bordered &&
    prev.gridTemplate === next.gridTemplate &&
    prev.size === next.size,
);
