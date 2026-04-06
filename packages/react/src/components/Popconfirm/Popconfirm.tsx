import { forwardRef, useState, useRef, useEffect, useCallback, useId } from 'react';
import { cn } from '../../utils/cn';
import type { PopconfirmProps } from './Popconfirm.types';

const positionStyles: Record<string, string> = {
  above: 'bottom-full left-1/2 -translate-x-1/2 mb-xs',
  below: 'top-full left-1/2 -translate-x-1/2 mt-xs',
  before: 'right-full top-1/2 -translate-y-1/2 mr-xs',
  after: 'left-full top-1/2 -translate-y-1/2 ml-xs',
};

const WarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5 text-palette-marigold-foreground-1 shrink-0"
  >
    <path
      fillRule="evenodd"
      d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

export const Popconfirm = forwardRef<HTMLDivElement, PopconfirmProps>(
  (
    {
      title,
      description,
      onConfirm,
      onCancel,
      confirmText = 'OK',
      cancelText = 'Cancel',
      icon,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      position = 'above',
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const containerRef = useRef<HTMLDivElement>(null);
    const descId = useId();

    const setOpen = useCallback(
      (value: boolean) => {
        setInternalOpen(value);
        onOpenChange?.(value);
      },
      [onOpenChange],
    );

    const handleTriggerClick = useCallback(() => {
      setOpen(!isOpen);
    }, [isOpen, setOpen]);

    const handleConfirm = useCallback(() => {
      onConfirm?.();
      setOpen(false);
    }, [onConfirm, setOpen]);

    const handleCancel = useCallback(() => {
      onCancel?.();
      setOpen(false);
    }, [onCancel, setOpen]);

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, setOpen]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' && isOpen) {
          e.stopPropagation();
          handleCancel();
        }
      },
      [isOpen, handleCancel],
    );

    return (
      <div
        ref={containerRef}
        className={cn('relative inline-block', className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <div onClick={handleTriggerClick} aria-expanded={isOpen} aria-haspopup="dialog">
          {children}
        </div>
        {isOpen && (
          <div
            ref={ref}
            role="alertdialog"
            aria-labelledby="popconfirm-title"
            aria-describedby={description ? descId : undefined}
            className={cn(
              'absolute z-50 bg-neutral-background-1 text-neutral-foreground-1 rounded-medium shadow-8 border border-neutral-stroke-1 p-m min-w-[240px] animate-[fw-fade-slide-in_150ms_var(--ease-decelerate-mid)]',
              positionStyles[position],
            )}
          >
            <div className="flex gap-s items-start">
              <span className="mt-px">{icon ?? <WarningIcon />}</span>
              <div className="flex flex-col gap-xs min-w-0">
                <span id="popconfirm-title" className="text-300 font-semibold leading-300">
                  {title}
                </span>
                {description && (
                  <span id={descId} className="text-200 text-neutral-foreground-2 leading-200">
                    {description}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-s mt-m">
              <button
                type="button"
                onClick={handleCancel}
                className={cn(
                  'inline-flex items-center justify-center font-semibold text-200 leading-200 px-m py-xxs rounded-medium border border-neutral-stroke-1',
                  'bg-neutral-background-1 text-neutral-foreground-1',
                  'hover:bg-neutral-background-1-hover hover:border-neutral-stroke-1-hover',
                  'active:bg-neutral-background-1-pressed',
                  'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
                )}
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className={cn(
                  'inline-flex items-center justify-center font-semibold text-200 leading-200 px-m py-xxs rounded-medium border border-transparent',
                  'bg-brand-background text-neutral-foreground-on-brand',
                  'hover:bg-brand-background-hover',
                  'active:bg-brand-background-pressed',
                  'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
                )}
              >
                {confirmText}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
);

Popconfirm.displayName = 'Popconfirm';
