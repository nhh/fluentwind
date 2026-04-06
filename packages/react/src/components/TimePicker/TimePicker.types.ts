import type { HTMLAttributes } from 'react';

export interface TimePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (time: string | null) => void;
  increment?: number;
  startHour?: number;
  endHour?: number;
  disabled?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
  hour12?: boolean;
}
