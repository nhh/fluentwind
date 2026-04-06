import type { HTMLAttributes } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The list of selectable options. */
  options: DropdownOption[];
  /** The currently selected value. */
  value?: string;
  /** Callback when the selected value changes. */
  onChange?: (value: string) => void;
  /** Placeholder text when no value is selected. */
  placeholder?: string;
  /** Size of the dropdown trigger. */
  size?: 'small' | 'medium' | 'large';
  /** Visual appearance of the dropdown trigger. */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
  /** Whether the dropdown is disabled. */
  disabled?: boolean;
}
