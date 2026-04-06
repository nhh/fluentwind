import type { HTMLAttributes, ReactNode } from 'react';

export interface CascaderOption {
  value: string;
  label: ReactNode;
  children?: CascaderOption[];
  disabled?: boolean;
}

export interface CascaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: CascaderOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
}
