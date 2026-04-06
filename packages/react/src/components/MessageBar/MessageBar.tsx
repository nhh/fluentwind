import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type {
  MessageBarProps,
  MessageBarBodyProps,
  MessageBarTitleProps,
  MessageBarActionsProps,
} from './MessageBar.types';
import type { ReactNode } from 'react';

const intentStyles = {
  info: {
    border: 'border-l-status-information-stroke-1',
    icon: (
      <svg className="h-5 w-5 text-status-information-foreground-1 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.25v1.75a.75.75 0 0 0 1.5 0V10a.75.75 0 0 0-.75-.75H9Z" clipRule="evenodd" />
      </svg>
    ),
  },
  success: {
    border: 'border-l-status-success-stroke-1',
    icon: (
      <svg className="h-5 w-5 text-status-success-foreground-1 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.86-10.14a.75.75 0 0 0-1.06-1.06l-4.3 4.3-1.96-1.96a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l4.82-4.82Z" clipRule="evenodd" />
      </svg>
    ),
  },
  warning: {
    border: 'border-l-status-warning-stroke-1',
    icon: (
      <svg className="h-5 w-5 text-status-warning-foreground-1 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M8.49 2.86a1.75 1.75 0 0 1 3.02 0l6.25 10.83A1.75 1.75 0 0 1 16.25 16H3.75a1.75 1.75 0 0 1-1.51-2.31L8.49 2.86ZM10 5a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 10 5Zm0 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
      </svg>
    ),
  },
  error: {
    border: 'border-l-status-danger-stroke-1',
    icon: (
      <svg className="h-5 w-5 text-status-danger-foreground-1 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
      </svg>
    ),
  },
};

const messageBarVariants = cva(
  'flex items-start gap-s bg-neutral-background-1 text-neutral-foreground-1 border border-neutral-stroke-1 border-l-4 px-m py-s',
  {
    variants: {
      shape: {
        rounded: 'rounded-medium',
        square: 'rounded-none',
      },
      layout: {
        singleline: 'items-center',
        multiline: 'flex-col',
      },
    },
    defaultVariants: {
      shape: 'rounded',
      layout: 'singleline',
    },
  },
);

export const MessageBar = forwardRef<HTMLDivElement, MessageBarProps>(
  ({ intent = 'info', shape, layout, className, children, ...props }, ref) => {
    const intentConfig = intentStyles[intent];
    const role = intent === 'error' ? 'alert' : 'status';

    return (
      <div
        ref={ref}
        role={role}
        className={cn(messageBarVariants({ shape, layout }), intentConfig.border, className)}
        {...props}
      >
        {layout !== 'multiline' && intentConfig.icon}
        {layout === 'multiline' && (
          <div className="flex items-center gap-s w-full">
            {intentConfig.icon}
            <div className="flex-1">{children}</div>
          </div>
        )}
        {layout !== 'multiline' && children}
      </div>
    );
  },
);

MessageBar.displayName = 'MessageBar';

export const MessageBarBody = forwardRef<HTMLDivElement, MessageBarBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex-1 text-300 leading-300', className)} {...props}>
        {children}
      </div>
    );
  },
);

MessageBarBody.displayName = 'MessageBarBody';

export const MessageBarTitle = forwardRef<HTMLSpanElement, MessageBarTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn('font-semibold mr-xs', className)} {...props}>
        {children}
      </span>
    );
  },
);

MessageBarTitle.displayName = 'MessageBarTitle';

export const MessageBarActions = forwardRef<HTMLDivElement, MessageBarActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center gap-xs ml-auto shrink-0', className)} {...props}>
        {children}
      </div>
    );
  },
);

MessageBarActions.displayName = 'MessageBarActions';
