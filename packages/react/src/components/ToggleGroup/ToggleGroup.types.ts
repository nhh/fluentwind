import type { HTMLAttributes, ReactNode } from 'react';

export interface ToggleGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  type?: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  size?: 'small' | 'medium' | 'large';
  appearance?: 'subtle' | 'outline';
  disabled?: boolean;
}

export interface ToggleGroupItemProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}
