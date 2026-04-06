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
import type { ReactNode } from 'react';
import type {
  NotificationData,
  NotificationIntent,
  NotificationOptions,
  NotificationPlacement,
  NotificationProviderProps,
  UseNotificationReturn,
} from './Notification.types';

// --- Intent Icons ---

const intentIcons: Record<NotificationIntent, ReactNode> = {
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

// --- Context ---

interface NotificationContextValue {
  notify: (options: NotificationOptions) => string;
  close: (id: string) => void;
  closeAll: () => void;
}

const NotificationContext = createContext<NotificationContextValue>({
  notify: () => '',
  close: () => {},
  closeAll: () => {},
});

// --- Placement classes ---

const placementClasses: Record<NotificationPlacement, string> = {
  'top-end': 'top-4 right-4',
  'top-start': 'top-4 left-4',
  'bottom-end': 'bottom-4 right-4',
  'bottom-start': 'bottom-4 left-4',
};

const placementAnimations: Record<NotificationPlacement, { enter: string; exit: string }> = {
  'top-end': {
    enter: 'animate-[fw-slide-in-top_200ms_var(--ease-decelerate-mid)]',
    exit: 'animate-[fw-slide-out-top_150ms_var(--ease-accelerate-mid)_forwards]',
  },
  'top-start': {
    enter: 'animate-[fw-slide-in-top_200ms_var(--ease-decelerate-mid)]',
    exit: 'animate-[fw-slide-out-top_150ms_var(--ease-accelerate-mid)_forwards]',
  },
  'bottom-end': {
    enter: 'animate-[fw-slide-in-bottom_200ms_var(--ease-decelerate-mid)]',
    exit: 'animate-[fw-slide-out-bottom_150ms_var(--ease-accelerate-mid)_forwards]',
  },
  'bottom-start': {
    enter: 'animate-[fw-slide-in-bottom_200ms_var(--ease-decelerate-mid)]',
    exit: 'animate-[fw-slide-out-bottom_150ms_var(--ease-accelerate-mid)_forwards]',
  },
};

// --- Single Notification Item ---

function NotificationItem({
  notification,
  onClose,
  defaultPlacement,
}: {
  notification: NotificationData;
  onClose: (id: string) => void;
  defaultPlacement: NotificationPlacement;
}) {
  const [exiting, setExiting] = useState(false);
  const placement = notification.placement ?? defaultPlacement;
  const intent = notification.intent ?? 'info';
  const closable = notification.closable !== false;
  const animations = placementAnimations[placement];

  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => setExiting(true), notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification.id, notification.duration]);

  const handleClose = useCallback(() => setExiting(true), []);

  const handleAnimationEnd = useCallback(() => {
    if (exiting) onClose(notification.id);
  }, [exiting, onClose, notification.id]);

  const icon = notification.icon !== undefined ? notification.icon : intentIcons[intent];

  return (
    <div
      role="status"
      aria-live="polite"
      onAnimationEnd={handleAnimationEnd}
      className={cn(
        'relative flex items-start gap-s p-m rounded-medium shadow-16 bg-neutral-background-1 text-neutral-foreground-1 border border-neutral-stroke-1 min-w-[320px] max-w-[420px]',
        exiting ? animations.exit : animations.enter,
      )}
    >
      {icon && <span className="shrink-0 mt-0.5">{icon}</span>}
      <div className="flex-1 min-w-0">
        <div className="text-300 font-semibold leading-300">{notification.title}</div>
        {notification.description && (
          <div className="text-200 leading-200 text-neutral-foreground-2 mt-xxs">
            {notification.description}
          </div>
        )}
        {notification.actions && (
          <div className="mt-s flex items-center gap-s">{notification.actions}</div>
        )}
      </div>
      {closable && (
        <button
          type="button"
          aria-label="Close notification"
          onClick={handleClose}
          className="shrink-0 p-xxs rounded-medium hover:bg-subtle-background-hover focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 transition-colors duration-fast cursor-pointer outline-none"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M4.09 4.22a.75.75 0 0 1 1.06-.04L10 8.94l4.85-4.76a.75.75 0 1 1 1.06 1.06L11.06 10l4.85 4.76a.75.75 0 1 1-1.06 1.06L10 11.06l-4.85 4.76a.75.75 0 0 1-1.06-1.06L8.94 10 4.09 5.24a.75.75 0 0 1-.04-1.06l.04.04Z" />
          </svg>
        </button>
      )}
    </div>
  );
}

// --- Notification Container ---

export function NotificationContainer({
  notifications,
  placement,
  onClose,
}: {
  notifications: NotificationData[];
  placement: NotificationPlacement;
  onClose: (id: string) => void;
}) {
  if (notifications.length === 0) return null;

  return (
    <div
      className={cn(
        'fixed z-[9999] flex flex-col gap-s',
        placementClasses[placement],
      )}
    >
      {notifications.map((n) => (
        <NotificationItem
          key={n.id}
          notification={n}
          onClose={onClose}
          defaultPlacement={placement}
        />
      ))}
    </div>
  );
}

NotificationContainer.displayName = 'NotificationContainer';

// --- Provider ---

let notificationCounter = 0;

export function NotificationProvider({
  children,
  placement = 'top-end',
  maxCount = 5,
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    containerRef.current = document.body;
  }, []);

  const close = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const closeAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const notify = useCallback(
    (options: NotificationOptions): string => {
      const id = `notification-${++notificationCounter}`;
      const data: NotificationData = {
        id,
        title: options.title,
        description: options.description,
        intent: options.intent ?? 'info',
        icon: options.icon,
        actions: options.actions,
        closable: options.closable !== false,
        duration: options.duration,
        placement: options.placement ?? placement,
      };
      setNotifications((prev) => {
        const next = [...prev, data];
        // Enforce maxCount: remove oldest when exceeded
        if (next.length > maxCount) {
          return next.slice(next.length - maxCount);
        }
        return next;
      });
      return id;
    },
    [placement, maxCount],
  );

  const ctx = useMemo(
    () => ({ notify, close, closeAll }),
    [notify, close, closeAll],
  );

  // Group notifications by placement
  const grouped = useMemo(() => {
    const map: Record<string, NotificationData[]> = {};
    for (const n of notifications) {
      const pos = n.placement ?? placement;
      if (!map[pos]) map[pos] = [];
      map[pos].push(n);
    }
    return map;
  }, [notifications, placement]);

  return (
    <NotificationContext.Provider value={ctx}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <>
            {Object.entries(grouped).map(([pos, items]) => (
              <NotificationContainer
                key={pos}
                notifications={items}
                placement={pos as NotificationPlacement}
                onClose={close}
              />
            ))}
          </>,
          document.body,
        )}
    </NotificationContext.Provider>
  );
}

NotificationProvider.displayName = 'NotificationProvider';

// --- useNotification hook ---

export function useNotification(): UseNotificationReturn {
  return useContext(NotificationContext);
}
