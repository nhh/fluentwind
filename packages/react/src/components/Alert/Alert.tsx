import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { AlertProps } from './Alert.types';
import type { ReactNode } from 'react';

// --- Intent Icons ---

type AlertIntent = NonNullable<AlertProps['intent']>;

const intentIcons: Record<AlertIntent, ReactNode> = {
  info: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.25v1.75a.75.75 0 0 0 1.5 0V10a.75.75 0 0 0-.75-.75H9Z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.86-10.14a.75.75 0 0 0-1.06-1.06l-4.3 4.3-1.96-1.96a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l4.82-4.82Z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M8.49 2.86a1.75 1.75 0 0 1 3.02 0l6.25 10.83A1.75 1.75 0 0 1 16.25 16H3.75a1.75 1.75 0 0 1-1.51-2.31L8.49 2.86ZM10 5a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 10 5Zm0 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
    </svg>
  ),
};

// --- Intent color config ---

const intentConfig: Record<AlertIntent, { primary: string; inverted: string; iconColor: string }> = {
  info: {
    primary: 'border-l-status-information-stroke-1 bg-status-information-background-1 text-neutral-foreground-1',
    inverted: 'border-l-status-information-stroke-1 bg-status-information-foreground-1 text-neutral-foreground-on-brand',
    iconColor: 'text-status-information-foreground-1',
  },
  success: {
    primary: 'border-l-status-success-stroke-1 bg-status-success-background-1 text-neutral-foreground-1',
    inverted: 'border-l-status-success-stroke-1 bg-status-success-foreground-1 text-neutral-foreground-on-brand',
    iconColor: 'text-status-success-foreground-1',
  },
  warning: {
    primary: 'border-l-status-warning-stroke-1 bg-status-warning-background-1 text-neutral-foreground-1',
    inverted: 'border-l-status-warning-stroke-1 bg-status-warning-foreground-1 text-neutral-foreground-on-brand',
    iconColor: 'text-status-warning-foreground-1',
  },
  error: {
    primary: 'border-l-status-danger-stroke-1 bg-status-danger-background-1 text-neutral-foreground-1',
    inverted: 'border-l-status-danger-stroke-1 bg-status-danger-foreground-1 text-neutral-foreground-on-brand',
    iconColor: 'text-status-danger-foreground-1',
  },
};

// --- Alert variants ---

const alertVariants = cva(
  'flex items-start gap-s border-l-4 px-m py-s rounded-medium text-300 leading-300',
  {
    variants: {
      appearance: {
        primary: '',
        inverted: '',
      },
    },
    defaultVariants: {
      appearance: 'primary',
    },
  },
);

// --- Alert ---

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      intent = 'info',
      appearance = 'primary',
      action,
      icon,
      onClose,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const colors = intentConfig[intent];
    const colorClasses = appearance === 'inverted' ? colors.inverted : colors.primary;
    const iconColorClass = appearance === 'inverted' ? 'text-current' : colors.iconColor;

    const resolvedIcon = icon !== undefined ? icon : (
      <span className={iconColorClass}>{intentIcons[intent]}</span>
    );

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        className={cn(alertVariants({ appearance }), colorClasses, className)}
        {...props}
      >
        {resolvedIcon && <span className="shrink-0 mt-0.5">{resolvedIcon}</span>}
        <div className="flex-1 min-w-0">{children}</div>
        {action && <div className="shrink-0 ml-auto">{action}</div>}
        {onClose && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className={cn(
              'shrink-0 p-xxs rounded-medium transition-colors duration-fast cursor-pointer outline-none',
              appearance === 'inverted'
                ? 'hover:bg-white/20'
                : 'hover:bg-subtle-background-hover',
              'focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
            )}
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M4.09 4.22a.75.75 0 0 1 1.06-.04L10 8.94l4.85-4.76a.75.75 0 1 1 1.06 1.06L11.06 10l4.85 4.76a.75.75 0 1 1-1.06 1.06L10 11.06l-4.85 4.76a.75.75 0 0 1-1.06-1.06L8.94 10 4.09 5.24a.75.75 0 0 1-.04-1.06l.04.04Z" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
