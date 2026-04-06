import { forwardRef, createContext, useContext, Children, isValidElement, cloneElement, type ReactElement } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { StepsProps, StepItemProps } from './Steps.types';

interface StepsContextValue {
  current: number;
  size: 'small' | 'medium';
  orientation: 'horizontal' | 'vertical';
  total: number;
}

const StepsContext = createContext<StepsContextValue>({
  current: 0,
  size: 'medium',
  orientation: 'horizontal',
  total: 0,
});

const containerVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-start',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const indicatorVariants = cva(
  'shrink-0 flex items-center justify-center rounded-circular border-2 font-semibold transition-colors duration-fast',
  {
    variants: {
      size: {
        small: 'w-6 h-6 text-200 leading-200',
        medium: 'w-8 h-8 text-300 leading-300',
      },
      status: {
        wait: 'border-neutral-stroke-1 bg-neutral-background-1 text-neutral-foreground-3',
        process: 'border-brand-stroke-1 bg-brand-background text-neutral-foreground-on-brand',
        finish: 'border-brand-stroke-1 bg-brand-background text-neutral-foreground-on-brand',
        error: 'border-status-danger-stroke-1 bg-status-danger-background-3 text-status-danger-foreground-1',
      },
    },
    defaultVariants: {
      size: 'medium',
      status: 'wait',
    },
  },
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2.5 7L5.5 10L11.5 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Steps = forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      current = 0,
      size = 'medium',
      orientation = 'horizontal',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const items = Children.toArray(children).filter(isValidElement);
    const total = items.length;

    return (
      <StepsContext.Provider value={{ current, size, orientation, total }}>
        <div
          ref={ref}
          role="list"
          className={cn(containerVariants({ orientation }), className)}
          {...props}
        >
          {items.map((child, index) => {
            const element = child as ReactElement<StepItemProps>;
            let status: StepItemProps['status'] = element.props.status;
            if (!status) {
              if (index < current) status = 'finish';
              else if (index === current) status = 'process';
              else status = 'wait';
            }
            return cloneElement(element, {
              key: index,
              stepNumber: index + 1,
              status,
            });
          })}
        </div>
      </StepsContext.Provider>
    );
  },
);

Steps.displayName = 'Steps';

export const StepItem = forwardRef<HTMLDivElement, StepItemProps>(
  (
    {
      title,
      description,
      icon,
      status = 'wait',
      stepNumber = 1,
      className,
      ...props
    },
    ref,
  ) => {
    const { size, orientation, total } = useContext(StepsContext);
    const isLast = stepNumber === total;

    const renderIndicator = () => {
      let content: React.ReactNode;
      if (icon) {
        content = icon;
      } else if (status === 'finish') {
        content = <CheckIcon />;
      } else if (status === 'error') {
        content = <ErrorIcon />;
      } else {
        content = stepNumber;
      }

      return (
        <span className={indicatorVariants({ size, status })}>
          {content}
        </span>
      );
    };

    const lineClasses = cn(
      'transition-colors duration-fast',
      status === 'finish' ? 'bg-brand-stroke-1' : 'bg-neutral-stroke-1',
    );

    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="listitem"
          className={cn('flex gap-m', className)}
          {...props}
        >
          <div className="flex flex-col items-center">
            {renderIndicator()}
            {!isLast && (
              <div className={cn('w-0.5 flex-1 min-h-6 mt-xs', lineClasses)} />
            )}
          </div>
          <div className={cn('pb-m', isLast && 'pb-0')}>
            <div
              className={cn(
                'font-semibold transition-colors duration-fast',
                size === 'small' ? 'text-200 leading-200' : 'text-300 leading-300',
                status === 'process' && 'text-brand-foreground-1',
                status === 'error' && 'text-status-danger-foreground-1',
                status === 'wait' && 'text-neutral-foreground-3',
                status === 'finish' && 'text-neutral-foreground-1',
              )}
            >
              {title}
            </div>
            {description && (
              <div
                className={cn(
                  'mt-xxs text-neutral-foreground-3',
                  size === 'small' ? 'text-100 leading-100' : 'text-200 leading-200',
                )}
              >
                {description}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="listitem"
        className={cn('flex-1 flex items-start gap-s', isLast && 'flex-none', className)}
        {...props}
      >
        <div className="flex items-center gap-s">
          {renderIndicator()}
          <div>
            <div
              className={cn(
                'font-semibold whitespace-nowrap transition-colors duration-fast',
                size === 'small' ? 'text-200 leading-200' : 'text-300 leading-300',
                status === 'process' && 'text-brand-foreground-1',
                status === 'error' && 'text-status-danger-foreground-1',
                status === 'wait' && 'text-neutral-foreground-3',
                status === 'finish' && 'text-neutral-foreground-1',
              )}
            >
              {title}
            </div>
            {description && (
              <div
                className={cn(
                  'mt-xxs text-neutral-foreground-3',
                  size === 'small' ? 'text-100 leading-100' : 'text-200 leading-200',
                )}
              >
                {description}
              </div>
            )}
          </div>
        </div>
        {!isLast && (
          <div className={cn('flex-1 h-0.5 mt-l self-start', lineClasses)} />
        )}
      </div>
    );
  },
);

StepItem.displayName = 'StepItem';
