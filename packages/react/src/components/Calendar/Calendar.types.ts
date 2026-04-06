import type { HTMLAttributes, ReactNode } from 'react';

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  mode?: 'month' | 'year';
  dateCellRender?: (date: Date) => ReactNode;
  disabledDate?: (date: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
}
