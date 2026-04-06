import { forwardRef, useEffect, useRef, useCallback, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import type {
  DialogProps,
  DialogSurfaceProps,
  DialogTitleProps,
  DialogBodyProps,
  DialogActionsProps,
} from './Dialog.types';

export const Dialog = ({
  open,
  onOpenChange,
  modalType = 'modal',
  children,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (modalType === 'modal' || modalType === 'alert') {
        if (!dialog.open) dialog.showModal();
      } else {
        if (!dialog.open) dialog.show();
      }
    } else {
      if (dialog.open) dialog.close();
    }
  }, [open, modalType]);

  const handleCancel = useCallback(
    (e: React.SyntheticEvent) => {
      if (modalType === 'alert') {
        e.preventDefault();
        return;
      }
      onOpenChange(false);
    },
    [modalType, onOpenChange],
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (modalType === 'alert') return;
      if (e.target === dialogRef.current) {
        onOpenChange(false);
      }
    },
    [modalType, onOpenChange],
  );

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/40 bg-transparent p-0 m-auto open:flex"
      aria-modal={modalType === 'modal' || modalType === 'alert' ? true : undefined}
      role={modalType === 'alert' ? 'alertdialog' : undefined}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      {children}
    </dialog>
  );
};

Dialog.displayName = 'Dialog';

export const DialogSurface = forwardRef<HTMLDivElement, DialogSurfaceProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-neutral-background-1 text-neutral-foreground-1 rounded-xlarge shadow-64 p-xxl flex flex-col gap-m max-w-[600px] w-full',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DialogSurface.displayName = 'DialogSurface';

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          'text-500 leading-500 font-semibold text-neutral-foreground-1',
          className,
        )}
        {...props}
      >
        {children}
      </h2>
    );
  },
);

DialogTitle.displayName = 'DialogTitle';

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-300 leading-300 text-neutral-foreground-1', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DialogBody.displayName = 'DialogBody';

export const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex justify-end gap-s', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DialogActions.displayName = 'DialogActions';
