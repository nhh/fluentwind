import type { HTMLAttributes, ReactNode } from 'react';

export interface SegmentedOption {
  /** Unique value for the option. */
  value: string;
  /** Display label. */
  label: ReactNode;
  /** Optional icon displayed before the label. */
  icon?: ReactNode;
  /** Whether the option is disabled. */
  disabled?: boolean;
}

export interface SegmentedProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The list of segment options. */
  options: SegmentedOption[];
  /** Controlled selected value. */
  value?: string;
  /** Initial selected value for uncontrolled usage. */
  defaultValue?: string;
  /** Callback when the selected value changes. */
  onChange?: (value: string) => void;
  /** Size of the segmented control. */
  size?: 'small' | 'medium' | 'large';
  /** Whether the segmented control fills the container width. */
  block?: boolean;
  /** Whether the entire control is disabled. */
  disabled?: boolean;
}
