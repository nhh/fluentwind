import type { HTMLAttributes } from 'react';

export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  presetColors?: string[];
  showInput?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}
