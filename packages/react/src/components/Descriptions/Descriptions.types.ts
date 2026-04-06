import type { HTMLAttributes, ReactNode } from 'react';

export interface DescriptionsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Number of items per row. */
  column?: number;
  /** Whether to show borders between cells. */
  bordered?: boolean;
  /** Size of the descriptions. */
  size?: 'small' | 'medium';
  /** Layout direction. */
  layout?: 'horizontal' | 'vertical';
  /** Title rendered above the descriptions. */
  title?: ReactNode;
}

export interface DescriptionsItemProps extends HTMLAttributes<HTMLDivElement> {
  /** The label of the item. */
  label: ReactNode;
  /** Number of columns the item spans. */
  span?: number;
  children?: ReactNode;
}
