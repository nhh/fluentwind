import type { InputHTMLAttributes, ReactNode } from 'react';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** Available options. */
  options: ComboboxOption[];
  /** Currently selected value. */
  value?: string;
  /** Callback when selection changes. */
  onChange?: (value: string) => void;
  /** Size of the combobox. */
  size?: 'small' | 'medium' | 'large';
  /** Visual appearance. */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
  /** Placeholder text. */
  placeholder?: string;
}
