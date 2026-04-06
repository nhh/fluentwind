import type { HTMLAttributes, ReactNode } from 'react';

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Label for the field. */
  label?: ReactNode;
  /** Whether the field is required. */
  required?: boolean;
  /** Hint text displayed below the control. */
  hint?: ReactNode;
  /** Validation message. */
  validationMessage?: ReactNode;
  /** Validation state. */
  validationState?: 'none' | 'success' | 'warning' | 'error';
  /** Size of the label. */
  size?: 'small' | 'medium' | 'large';
  /** Orientation of the label relative to the control. */
  orientation?: 'vertical' | 'horizontal';
}
