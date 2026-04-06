import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { LinkProps } from './Link.types';

const linkVariants = cva(
  'cursor-pointer transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1 rounded-medium',
  {
    variants: {
      appearance: {
        default:
          'text-brand-foreground-link hover:text-brand-foreground-link-hover active:text-brand-foreground-link-pressed',
        subtle:
          'text-neutral-foreground-2 hover:text-neutral-foreground-1 active:text-neutral-foreground-1',
      },
      inline: {
        true: 'underline',
        false: '',
      },
    },
    defaultVariants: {
      appearance: 'default',
      inline: false,
    },
  },
);

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ appearance, inline, disabled, className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={cn(
          linkVariants({ appearance, inline }),
          disabled && 'text-neutral-foreground-disabled cursor-not-allowed no-underline',
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
);

Link.displayName = 'Link';
