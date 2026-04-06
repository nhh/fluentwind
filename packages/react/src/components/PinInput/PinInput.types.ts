import type { HTMLAttributes } from 'react';

export interface PinInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  mask?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
}
