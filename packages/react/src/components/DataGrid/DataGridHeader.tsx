import { cn } from '../../utils/cn';
import type { DataGridColumn, SortDirection } from './DataGrid.types';

interface DataGridHeaderProps {
  columns: DataGridColumn[];
  gridTemplate: string;
  size: 'small' | 'medium';
  onHeaderClick: (columnKey: string) => void;
  getSortDirection: (columnKey: string) => SortDirection | undefined;
}

const sizeStyles = {
  small: 'px-m py-xs text-200 leading-200',
  medium: 'px-m py-s text-300 leading-300',
} as const;

function SortAscIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M6 2.5l3.5 4h-7z" />
    </svg>
  );
}

function SortDescIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M6 9.5l3.5-4h-7z" />
    </svg>
  );
}

function SortUnsortedIcon() {
  return (
    <span className="text-neutral-foreground-4 flex flex-col" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 2.5l3.5 4h-7z" />
      </svg>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="currentColor"
        className="-mt-1.5"
      >
        <path d="M6 9.5l3.5-4h-7z" />
      </svg>
    </span>
  );
}

function SortIndicator({ direction }: { direction: SortDirection | undefined }) {
  if (direction === 'ascending') return <SortAscIcon />;
  if (direction === 'descending') return <SortDescIcon />;
  return <SortUnsortedIcon />;
}

function getAriaSortValue(
  sortable: boolean | undefined,
  direction: SortDirection | undefined,
): 'ascending' | 'descending' | 'none' | undefined {
  if (!sortable) return undefined;
  if (direction === 'ascending') return 'ascending';
  if (direction === 'descending') return 'descending';
  return 'none';
}

export function DataGridHeader({
  columns,
  gridTemplate,
  size,
  onHeaderClick,
  getSortDirection,
}: DataGridHeaderProps) {
  return (
    <div
      role="row"
      aria-rowindex={1}
      className="grid bg-neutral-background-3 border-b border-neutral-stroke-2"
      style={{ gridTemplateColumns: gridTemplate }}
    >
      {columns.map((column, i) => {
        const sortDirection = getSortDirection(column.key);

        return (
          <div
            key={column.key}
            role="columnheader"
            aria-colindex={i + 1}
            aria-sort={getAriaSortValue(column.sortable, sortDirection)}
            className={cn(
              'font-semibold text-neutral-foreground-2 select-none truncate flex items-center gap-xs',
              sizeStyles[size],
              column.sortable &&
                'cursor-pointer hover:bg-subtle-background-hover transition-colors duration-fast',
            )}
            onClick={column.sortable ? () => onHeaderClick(column.key) : undefined}
          >
            {column.header}
            {column.sortable && <SortIndicator direction={sortDirection} />}
          </div>
        );
      })}
    </div>
  );
}
