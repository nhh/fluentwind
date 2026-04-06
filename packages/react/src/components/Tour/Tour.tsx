import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import type { TourProps, TourStep } from './Tour.types';

const placementStyles: Record<string, (rect: DOMRect) => React.CSSProperties> = {
  top: (rect) => ({
    position: 'absolute',
    left: rect.left + rect.width / 2,
    top: rect.top + window.scrollY - 12,
    transform: 'translate(-50%, -100%)',
  }),
  bottom: (rect) => ({
    position: 'absolute',
    left: rect.left + rect.width / 2,
    top: rect.bottom + window.scrollY + 12,
    transform: 'translate(-50%, 0)',
  }),
  left: (rect) => ({
    position: 'absolute',
    left: rect.left - 12,
    top: rect.top + window.scrollY + rect.height / 2,
    transform: 'translate(-100%, -50%)',
  }),
  right: (rect) => ({
    position: 'absolute',
    left: rect.right + 12,
    top: rect.top + window.scrollY + rect.height / 2,
    transform: 'translate(0, -50%)',
  }),
};

function getTargetElement(target: TourStep['target']): HTMLElement | null {
  if (!target) return null;
  if (typeof target === 'string') {
    return document.querySelector<HTMLElement>(target);
  }
  return target.current ?? null;
}

function getSpotlightClipPath(rect: DOMRect, padding: number = 8): string {
  const x = rect.left - padding;
  const y = rect.top - padding;
  const w = rect.width + padding * 2;
  const h = rect.height + padding * 2;
  const r = 8;

  // Full screen polygon with a rounded-rect hole
  return `polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${x + r}px ${y}px, ${x + w - r}px ${y}px, ${x + w}px ${y + r}px, ${x + w}px ${y + h - r}px, ${x + w - r}px ${y + h}px, ${x + r}px ${y + h}px, ${x}px ${y + h - r}px, ${x}px ${y + r}px, ${x + r}px ${y}px)`;
}

export const Tour = ({
  steps,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  current: controlledCurrent,
  defaultCurrent = 0,
  onCurrentChange,
}: TourProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const current = controlledCurrent !== undefined ? controlledCurrent : internalCurrent;

  const setOpen = useCallback(
    (value: boolean) => {
      setInternalOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

  const setCurrent = useCallback(
    (value: number) => {
      setInternalCurrent(value);
      onCurrentChange?.(value);
    },
    [onCurrentChange],
  );

  const step = steps[current];

  // Update target rect on step change and on scroll/resize
  useEffect(() => {
    if (!isOpen || !step) return;

    const updateRect = () => {
      const el = getTargetElement(step.target);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        setTargetRect(null);
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [isOpen, current, step]);

  const handleNext = useCallback(() => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      setOpen(false);
    }
  }, [current, steps.length, setCurrent, setOpen]);

  const handlePrev = useCallback(() => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }, [current, setCurrent]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen || !step) return null;

  const placement = step.placement ?? 'bottom';

  const cardStyle: React.CSSProperties = targetRect
    ? placementStyles[placement](targetRect)
    : {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      };

  const overlay = (
    <div className="fixed inset-0 z-[9998]" style={{ pointerEvents: 'auto' }}>
      {/* Backdrop with spotlight */}
      <div
        className="fixed inset-0 bg-black/50 transition-all duration-fast"
        style={
          targetRect
            ? { clipPath: getSpotlightClipPath(targetRect) }
            : undefined
        }
        onClick={handleClose}
      />

      {/* Tooltip card */}
      <div
        ref={cardRef}
        className={cn(
          'z-[9999] max-w-[340px] min-w-[260px] bg-neutral-background-1 text-neutral-foreground-1 shadow-16 rounded-medium p-m animate-[fw-fade-slide-in_150ms_var(--ease-decelerate-mid)]',
        )}
        style={cardStyle}
      >
        {/* Title */}
        <div className="text-400 leading-400 font-semibold mb-xs">{step.title}</div>

        {/* Description */}
        {step.description && (
          <div className="text-300 leading-300 text-neutral-foreground-2 mb-m">
            {step.description}
          </div>
        )}

        {/* Footer: dots + buttons */}
        <div className="flex items-center justify-between">
          {/* Step indicator dots */}
          <div className="flex gap-xs">
            {steps.map((_, idx) => (
              <span
                key={idx}
                className={cn(
                  'w-[6px] h-[6px] rounded-full transition-colors duration-fast',
                  idx === current
                    ? 'bg-brand-background'
                    : 'bg-neutral-stroke-2',
                )}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-xs">
            <button
              type="button"
              onClick={handleClose}
              className="px-m py-xs text-200 leading-200 rounded-medium cursor-pointer outline-none transition-colors duration-fast text-neutral-foreground-2 hover:bg-subtle-background-hover"
            >
              Close
            </button>
            {current > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-m py-xs text-200 leading-200 rounded-medium cursor-pointer outline-none transition-colors duration-fast border border-neutral-stroke-1 text-neutral-foreground-1 hover:bg-subtle-background-hover"
              >
                Prev
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="px-m py-xs text-200 leading-200 rounded-medium cursor-pointer outline-none transition-colors duration-fast bg-brand-background text-neutral-foreground-on-brand hover:bg-brand-background-hover active:bg-brand-background-pressed"
            >
              {current < steps.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
};

Tour.displayName = 'Tour';
