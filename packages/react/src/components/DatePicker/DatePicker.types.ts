import type { HTMLAttributes } from 'react';

export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
  formatDate?: (date: Date) => string;
  parseDate?: (str: string) => Date | null;
}
