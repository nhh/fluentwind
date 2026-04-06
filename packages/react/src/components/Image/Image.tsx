import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ImageProps } from './Image.types';

const shapeClasses: Record<NonNullable<ImageProps['shape']>, string> = {
  rounded: 'rounded-medium',
  circular: 'rounded-circular',
  square: 'rounded-none',
};

const fitClasses: Record<NonNullable<ImageProps['fit']>, string> = {
  none: '',
  center: 'object-none object-center',
  contain: 'object-contain',
  cover: 'object-cover',
  default: 'object-fill',
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      bordered = false,
      shape = 'rounded',
      shadow = false,
      block = false,
      fit = 'default',
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <img
        ref={ref}
        className={cn(
          shapeClasses[shape],
          fitClasses[fit],
          bordered && 'border border-neutral-stroke-2',
          shadow && 'shadow-4',
          block && 'block w-full',
          className,
        )}
        {...props}
      />
    );
  },
);

Image.displayName = 'Image';
