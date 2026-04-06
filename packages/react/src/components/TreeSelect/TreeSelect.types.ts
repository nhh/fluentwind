import type { HTMLAttributes, ReactNode } from 'react';

export interface TreeSelectNode {
  key: string;
  label: ReactNode;
  children?: TreeSelectNode[];
  disabled?: boolean;
}

export interface TreeSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  treeData: TreeSelectNode[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
}
