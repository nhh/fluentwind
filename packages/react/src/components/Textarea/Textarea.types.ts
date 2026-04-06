import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Size of the textarea. */
  size?: 'small' | 'medium' | 'large';
  /** Visual appearance. */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
  /** Whether the textarea can be resized. */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}
