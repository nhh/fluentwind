import type { HTMLAttributes, ReactNode } from 'react';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  intent?: 'info' | 'success' | 'warning' | 'error';
  appearance?: 'primary' | 'inverted';
  action?: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
}
