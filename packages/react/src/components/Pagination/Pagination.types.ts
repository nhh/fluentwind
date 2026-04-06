import type { HTMLAttributes } from 'react';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  totalPages: number;
  currentPage?: number;
  defaultPage?: number;
  siblingCount?: number;
  onChange?: (page: number) => void;
  size?: 'small' | 'medium';
  disabled?: boolean;
}
