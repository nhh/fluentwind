import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { DividerProps } from './Divider.types';

const lineColor: Record<NonNullable<DividerProps['appearance']>, string> = {
  default: 'bg-neutral-stroke-2',
  subtle: 'bg-neutral-stroke-3',
  brand: 'bg-brand-stroke-1',
  strong: 'bg-neutral-stroke-1',
};

export const Divider = forwardRef<HTMLElement, DividerProps>(
  (
    {
      vertical = false,
      appearance = 'default',
      alignContent = 'center',
      inset = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const hasContent = children !== undefined && children !== null;
    const color = lineColor[appearance];

    if (vertical) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            'inline-flex flex-col items-center self-stretch',
            inset && 'my-m',
            className,
          )}
          {...props}
        >
          {hasContent ? (
            <>
              <div className={cn('w-px flex-1', color, alignContent === 'start' && 'flex-none h-m')} />
              <span className="text-200 leading-200 text-neutral-foreground-2 px-m">{children}</span>
              <div className={cn('w-px flex-1', color, alignContent === 'end' && 'flex-none h-m')} />
            </>
          ) : (
            <div className={cn('w-px flex-1', color)} />
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        className={cn(
          'flex items-center w-full',
          inset && 'px-m',
          className,
        )}
        {...props}
      >
        {hasContent ? (
          <>
            <div className={cn('h-px flex-1', color, alignContent === 'start' && 'flex-none w-m')} />
            <span className="text-200 leading-200 text-neutral-foreground-2 px-m">{children}</span>
            <div className={cn('h-px flex-1', color, alignContent === 'end' && 'flex-none w-m')} />
          </>
        ) : (
          <div className={cn('h-px flex-1', color)} />
        )}
      </div>
    );
  },
);

Divider.displayName = 'Divider';
