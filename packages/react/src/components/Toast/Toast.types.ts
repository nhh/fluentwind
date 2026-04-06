import type { ReactNode } from 'react';

export type ToastIntent = 'success' | 'warning' | 'error' | 'info';
export type ToastPosition = 'top' | 'top-end' | 'bottom' | 'bottom-end';

export interface ToastOptions {
  /** Intent/severity of the toast. */
  intent?: ToastIntent;
  /** Auto-dismiss timeout in ms. Set to 0 to disable. */
  timeout?: number;
  /** Position on screen. */
  position?: ToastPosition;
}

export interface ToastData {
  id: string;
  content: ReactNode;
  intent: ToastIntent;
  timeout: number;
  position: ToastPosition;
}

export interface ToasterProps {
  /** Default position for toasts. */
  position?: ToastPosition;
}

export interface UseToastReturn {
  /** Dispatch a new toast. */
  dispatchToast: (content: ReactNode, options?: ToastOptions) => void;
  /** Dismiss a toast by id. */
  dismissToast: (id: string) => void;
  /** Current toasts. */
  toasts: ToastData[];
}
