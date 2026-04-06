import type { HTMLAttributes } from 'react';

export interface TagPickerOption {
  value: string;
  label: string;
}

export interface TagPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Available options. */
  options: TagPickerOption[];
  /** Controlled selected values. */
  selectedValues?: string[];
  /** Default selected values (uncontrolled). */
  defaultSelectedValues?: string[];
  /** Called when selection changes. */
  onSelectionChange?: (values: string[]) => void;
  /** Placeholder text when no values are selected. */
  placeholder?: string;
  /** Size of the picker. */
  size?: 'medium' | 'large';
  /** Disabled state. */
  disabled?: boolean;
}
