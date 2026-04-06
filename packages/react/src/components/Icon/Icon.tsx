import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

/**
 * A wrapper component for rendering SVG icons at Fluent-standard sizes.
 * Pass an SVG element or icon component as children.
 *
 * Usage:
 *   <Icon size={24} label="Settings">
 *     <svg>...</svg>
 *   </Icon>
 */
export const Icon = forwardRef<HTMLSpanElement, IconProps & { children?: ReactNode }>(
  ({ size = 20, filled, label, className, children, ...props }, ref) => {
    const pxSize = `${size}px`;

    return (
      <span
        ref={ref}
        role={label ? 'img' : 'presentation'}
        aria-label={label}
        aria-hidden={!label || undefined}
        className={cn('inline-flex items-center justify-center shrink-0', className)}
        style={{ width: pxSize, height: pxSize, fontSize: pxSize }}
        {...(props as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {children}
      </span>
    );
  },
);

Icon.displayName = 'Icon';
