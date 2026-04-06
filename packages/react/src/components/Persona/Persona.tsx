import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { PersonaProps } from './Persona.types';

const nameVariants = cva('font-semibold text-neutral-foreground-1', {
  variants: {
    size: {
      small: 'text-200 leading-200',
      medium: 'text-300 leading-300',
      large: 'text-400 leading-400',
      extraLarge: 'text-500 leading-500',
      huge: 'text-600 leading-600',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const secondaryVariants = cva('text-neutral-foreground-2', {
  variants: {
    size: {
      small: 'text-100 leading-100',
      medium: 'text-200 leading-200',
      large: 'text-300 leading-300',
      extraLarge: 'text-300 leading-300',
      huge: 'text-400 leading-400',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export const Persona = forwardRef<HTMLDivElement, PersonaProps>(
  (
    {
      name,
      secondaryText,
      tertiaryText,
      quaternaryText,
      avatar,
      size = 'medium',
      textPosition = 'after',
      textAlignment = 'start',
      className,
      ...props
    },
    ref,
  ) => {
    const textLines = (
      <div
        className={cn(
          'flex flex-col min-w-0',
          textAlignment === 'center' && 'items-center text-center',
        )}
      >
        {name && <span className={nameVariants({ size })}>{name}</span>}
        {secondaryText && <span className={secondaryVariants({ size })}>{secondaryText}</span>}
        {tertiaryText && (
          <span className={cn(secondaryVariants({ size }), 'text-neutral-foreground-3')}>
            {tertiaryText}
          </span>
        )}
        {quaternaryText && (
          <span className={cn(secondaryVariants({ size }), 'text-neutral-foreground-3')}>
            {quaternaryText}
          </span>
        )}
      </div>
    );

    if (textPosition === 'below') {
      return (
        <div
          ref={ref}
          className={cn(
            'inline-flex flex-col items-center gap-s',
            textAlignment === 'start' && 'items-start',
            className,
          )}
          {...props}
        >
          {avatar}
          {textLines}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center gap-s', className)}
        {...props}
      >
        {textPosition === 'before' && textLines}
        {avatar}
        {textPosition === 'after' && textLines}
      </div>
    );
  },
);

Persona.displayName = 'Persona';
