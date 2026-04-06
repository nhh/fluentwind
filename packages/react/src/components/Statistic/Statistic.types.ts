import type { HTMLAttributes, ReactNode } from 'react';

export interface StatisticProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> {
  /** Label displayed above the value. */
  title?: ReactNode;
  /** The statistic value to display. */
  value: ReactNode;
  /** Element rendered before the value. */
  prefix?: ReactNode;
  /** Element rendered after the value. */
  suffix?: ReactNode;
  /** Number of decimal places for numeric values. */
  precision?: number;
  /** Trend direction indicator. */
  trend?: 'up' | 'down';
  /** Value displayed alongside the trend indicator. */
  trendValue?: ReactNode;
  /** Controls the value text size. */
  size?: 'small' | 'medium' | 'large';
}
