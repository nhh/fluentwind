import { memo } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface DataGridCellProps {
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
  size: 'small' | 'medium';
  colIndex: number;
}

const alignmentMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
} as const;

const sizeStyles = {
  small: 'px-m py-xs text-200 leading-200',
  medium: 'px-m py-s text-300 leading-300',
} as const;

export const DataGridCell = memo(function DataGridCell({
  children,
  align = 'start',
  size,
  colIndex,
}: DataGridCellProps) {
  return (
    <div
      role="gridcell"
      aria-colindex={colIndex + 1}
      className={cn(
        'flex items-center truncate',
        sizeStyles[size],
        alignmentMap[align],
      )}
    >
      {children}
    </div>
  );
});
