import type { HTMLAttributes, ReactNode } from 'react';

export interface DialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Callback when the open state changes. */
  onOpenChange: (open: boolean) => void;
  /** The type of modal behavior. */
  modalType?: 'modal' | 'nonModal' | 'alert';
  children: ReactNode;
}

export interface DialogSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

export interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface DialogActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
