import { cn } from '../../utils/cn';

interface DataGridFooterProps {
  totalRows: number;
  selectedCount: number;
  size: 'small' | 'medium';
}

const sizeStyles = {
  small: 'px-m py-xxs text-100 leading-100',
  medium: 'px-m py-xs text-200 leading-200',
} as const;

export function DataGridFooter({
  totalRows,
  selectedCount,
  size,
}: DataGridFooterProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'border-t border-neutral-stroke-2 bg-neutral-background-3 flex items-center justify-between text-neutral-foreground-2',
        sizeStyles[size],
      )}
    >
      <span>{totalRows.toLocaleString()} rows</span>
      {selectedCount > 0 && (
        <span>{selectedCount.toLocaleString()} selected</span>
      )}
    </div>
  );
}
