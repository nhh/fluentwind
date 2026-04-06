import {
  useState,
  useCallback,
  useEffect,
  useRef,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import type {
  ToastData,
  ToastIntent,
  ToastOptions,
  ToastPosition,
  ToasterProps,
  UseToastReturn,
} from './Toast.types';
import type { ReactNode } from 'react';

// --- Context ---

interface ToastContextValue {
  dispatchToast: (content: ReactNode, options?: ToastOptions) => void;
  dismissToast: (id: string) => void;
  toasts: ToastData[];
}

const ToastContext = createContext<ToastContextValue>({
  dispatchToast: () => {},
  dismissToast: () => {},
  toasts: [],
});

// --- Provider (internal, used by Toaster) ---

let toastCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dispatchToast = useCallback(
    (content: ReactNode, options?: ToastOptions) => {
      const id = `toast-${++toastCounter}`;
      const toast: ToastData = {
        id,
        content,
        intent: options?.intent ?? 'info',
        timeout: options?.timeout ?? 3000,
        position: options?.position ?? 'bottom-end',
      };
      setToasts((prev) => [...prev, toast]);
    },
    [],
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const ctx = useMemo(
    () => ({ dispatchToast, dismissToast, toasts }),
    [dispatchToast, dismissToast, toasts],
  );

  return <ToastContext.Provider value={ctx}>{children}</ToastContext.Provider>;
}

// --- useToast hook ---

export function useToast(): UseToastReturn {
  return useContext(ToastContext);
}

// --- Intent Icons ---

const intentIcons: Record<ToastIntent, ReactNode> = {
  info: (
    <svg className="h-5 w-5 text-status-information-foreground-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.25v1.75a.75.75 0 0 0 1.5 0V10a.75.75 0 0 0-.75-.75H9Z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5 text-status-success-foreground-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.86-10.14a.75.75 0 0 0-1.06-1.06l-4.3 4.3-1.96-1.96a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l4.82-4.82Z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5 text-status-warning-foreground-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M8.49 2.86a1.75 1.75 0 0 1 3.02 0l6.25 10.83A1.75 1.75 0 0 1 16.25 16H3.75a1.75 1.75 0 0 1-1.51-2.31L8.49 2.86ZM10 5a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 10 5Zm0 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5 text-status-danger-foreground-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
    </svg>
  ),
};

// --- Single Toast ---

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: string) => void;
}) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (toast.timeout > 0) {
      const timer = setTimeout(() => setExiting(true), toast.timeout);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.timeout]);

  const handleDismiss = useCallback(() => setExiting(true), []);

  const handleAnimationEnd = useCallback(() => {
    if (exiting) onDismiss(toast.id);
  }, [exiting, onDismiss, toast.id]);

  return (
    <div
      role="alert"
      onAnimationEnd={handleAnimationEnd}
      className={cn(
        'flex items-start gap-s px-m py-s rounded-medium shadow-16 bg-neutral-background-1 text-neutral-foreground-1 border border-neutral-stroke-1',
        exiting
          ? 'animate-[fw-slide-out-bottom_150ms_var(--ease-accelerate-mid)_forwards]'
          : 'animate-[fw-slide-in-bottom_200ms_var(--ease-decelerate-mid)]',
      )}
    >
      <span className="shrink-0 mt-0.5">{intentIcons[toast.intent]}</span>
      <span className="flex-1 text-300 leading-300">{toast.content}</span>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={handleDismiss}
        className="shrink-0 p-1 rounded-medium hover:bg-subtle-background-hover transition-colors duration-fast cursor-pointer"
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M4.09 4.22a.75.75 0 0 1 1.06-.04L10 8.94l4.85-4.76a.75.75 0 1 1 1.06 1.06L11.06 10l4.85 4.76a.75.75 0 1 1-1.06 1.06L10 11.06l-4.85 4.76a.75.75 0 0 1-1.06-1.06L8.94 10 4.09 5.24a.75.75 0 0 1-.04-1.06l.04.04Z" />
        </svg>
      </button>
    </div>
  );
}

// --- Position mapping ---

const positionClasses: Record<ToastPosition, string> = {
  top: 'top-4 left-1/2 -translate-x-1/2',
  'top-end': 'top-4 right-4',
  bottom: 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-end': 'bottom-4 right-4',
};

// --- Toaster ---

export function Toaster({ position = 'bottom-end' }: ToasterProps) {
  const { toasts, dismissToast } = useContext(ToastContext);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    containerRef.current = document.body;
  }, []);

  // Group toasts by position
  const grouped = useMemo(() => {
    const map: Record<string, ToastData[]> = {};
    for (const toast of toasts) {
      const pos = toast.position ?? position;
      if (!map[pos]) map[pos] = [];
      map[pos].push(toast);
    }
    return map;
  }, [toasts, position]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <>
      {Object.entries(grouped).map(([pos, items]) => (
        <div
          key={pos}
          className={cn(
            'fixed z-[9999] flex flex-col gap-s w-[360px] max-w-[calc(100vw-2rem)]',
            positionClasses[pos as ToastPosition] ?? positionClasses['bottom-end'],
          )}
        >
          {items.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
          ))}
        </div>
      ))}
    </>,
    document.body,
  );
}
