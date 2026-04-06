import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { SliderProps } from './Slider.types';

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ size = 'medium', vertical = false, disabled, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="range"
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        disabled={disabled}
        className={cn(
          'appearance-none bg-transparent cursor-pointer outline-none',
          vertical ? 'h-40' : 'w-full',
          size === 'small'
            ? '[&::-webkit-slider-runnable-track]:h-0.5 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:-mt-[7px]'
            : '[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:-mt-2',
          '[&::-webkit-slider-runnable-track]:rounded-circular [&::-webkit-slider-runnable-track]:bg-neutral-stroke-1',
          '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-circular [&::-webkit-slider-thumb]:bg-brand-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neutral-background-1 [&::-webkit-slider-thumb]:shadow-2',
          '[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-fast',
          '[&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:active:scale-95',
          // Firefox
          '[&::-moz-range-track]:rounded-circular [&::-moz-range-track]:bg-neutral-stroke-1',
          size === 'small'
            ? '[&::-moz-range-track]:h-0.5 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4'
            : '[&::-moz-range-track]:h-1 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5',
          '[&::-moz-range-thumb]:rounded-circular [&::-moz-range-thumb]:bg-brand-background [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-neutral-background-1',
          'focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-neutral-stroke-focus-2',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        {...props}
      />
    );
  },
);

Slider.displayName = 'Slider';
