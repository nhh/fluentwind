import {
  useState,
  useRef,
  useCallback,
  useId,
  cloneElement,
  type ReactElement,
} from 'react';
import { cn } from '../../utils/cn';
import type { TooltipProps } from './Tooltip.types';

const positionStyles: Record<string, string> = {
  above: 'bottom-full left-1/2 -translate-x-1/2 mb-xs',
  below: 'top-full left-1/2 -translate-x-1/2 mt-xs',
  before: 'right-full top-1/2 -translate-y-1/2 mr-xs',
  after: 'left-full top-1/2 -translate-y-1/2 ml-xs',
};

const appearanceStyles: Record<string, string> = {
  normal:
    'bg-neutral-background-1 text-neutral-foreground-1 border border-neutral-stroke-1',
  inverted:
    'bg-neutral-background-inverted text-neutral-foreground-inverted',
};

export const Tooltip = ({
  content,
  positioning = 'above',
  appearance = 'normal',
  relationship = 'label',
  children,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const tooltipId = useId();

  const show = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), 250);
  }, []);

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  }, []);

  const ariaProps =
    relationship === 'label'
      ? { 'aria-labelledby': tooltipId }
      : { 'aria-describedby': tooltipId };

  const trigger = cloneElement(children as ReactElement<Record<string, unknown>>, {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    ...ariaProps,
  });

  return (
    <div className="relative inline-block">
      {trigger}
      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            'absolute z-50 rounded-medium shadow-4 px-s py-xs text-200 leading-200 whitespace-nowrap pointer-events-none',
            appearanceStyles[appearance],
            positionStyles[positioning],
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
