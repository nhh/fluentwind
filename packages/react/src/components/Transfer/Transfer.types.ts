import type { HTMLAttributes, ReactNode } from 'react';

export interface TransferItem {
  key: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface TransferProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  dataSource: TransferItem[];
  targetKeys?: string[];
  defaultTargetKeys?: string[];
  onChange?: (targetKeys: string[]) => void;
  titles?: [ReactNode, ReactNode];
  showSearch?: boolean;
  disabled?: boolean;
}
