import type { ReactNode, HTMLAttributes } from 'react';

export interface PopconfirmProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The confirmation title. */
  title: ReactNode;
  /** Optional description text below the title. */
  description?: ReactNode;
  /** Callback when the user confirms. */
  onConfirm?: () => void;
  /** Callback when the user cancels. */
  onCancel?: () => void;
  /** Text for the confirm button. */
  confirmText?: string;
  /** Text for the cancel button. */
  cancelText?: string;
  /** Custom icon displayed next to the title. */
  icon?: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Callback when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Positioning relative to the trigger. */
  position?: 'above' | 'below' | 'before' | 'after';
  /** The trigger element. */
  children: ReactNode;
}
