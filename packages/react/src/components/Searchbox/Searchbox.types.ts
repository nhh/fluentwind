import type { InputHTMLAttributes } from 'react';

export interface SearchboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the searchbox. */
  size?: 'small' | 'medium' | 'large';
  /** Visual appearance. */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
  /** Callback when the dismiss button is clicked. */
  onDismiss?: () => void;
}
