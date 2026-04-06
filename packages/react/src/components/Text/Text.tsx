import { forwardRef, type ElementType } from 'react';
import { cn } from '../../utils/cn';
import type { TextProps } from './Text.types';

const variantStyles: Record<NonNullable<TextProps['variant']>, string> = {
  caption2: 'text-100 leading-100 font-normal',
  caption2Strong: 'text-100 leading-100 font-semibold',
  caption1: 'text-200 leading-200 font-normal',
  caption1Strong: 'text-200 leading-200 font-semibold',
  caption1Stronger: 'text-200 leading-200 font-bold',
  body1: 'text-300 leading-300 font-normal',
  body1Strong: 'text-300 leading-300 font-semibold',
  body1Stronger: 'text-300 leading-300 font-bold',
  subtitle2: 'text-400 leading-400 font-semibold',
  subtitle2Stronger: 'text-400 leading-400 font-bold',
  subtitle1: 'text-500 leading-500 font-semibold',
  title3: 'text-600 leading-600 font-semibold',
  title2: 'text-700 leading-700 font-semibold',
  title1: 'text-800 leading-800 font-semibold',
  largeTitle: 'text-900 leading-900 font-semibold',
  display: 'text-1000 leading-1000 font-semibold',
};

const defaultElements: Partial<Record<NonNullable<TextProps['variant']>, ElementType>> = {
  title1: 'h1',
  title2: 'h2',
  title3: 'h3',
  subtitle1: 'h4',
  subtitle2: 'h5',
  largeTitle: 'h1',
  display: 'h1',
};

const fontStyles: Record<NonNullable<TextProps['font']>, string> = {
  base: 'font-base',
  mono: 'font-mono',
  numeric: 'font-numeric',
};

const alignStyles: Record<NonNullable<TextProps['align']>, string> = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
  justify: 'text-justify',
};

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as,
      variant = 'body1',
      wrap = true,
      truncate = false,
      align,
      font = 'base',
      italic = false,
      underline = false,
      strikethrough = false,
      block = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = as || defaultElements[variant] || 'span';

    return (
      <Component
        ref={ref}
        className={cn(
          'text-neutral-foreground-1',
          variantStyles[variant],
          fontStyles[font],
          align && alignStyles[align],
          !wrap && 'whitespace-nowrap',
          truncate && 'truncate',
          italic && 'italic',
          underline && 'underline',
          strikethrough && 'line-through',
          block && 'block',
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = 'Text';
