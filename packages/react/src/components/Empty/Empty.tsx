import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { EmptyProps } from './Empty.types';

const emptyVariants = cva('flex flex-col items-center justify-center gap-m', {
  variants: {
    size: {
      small: '',
      medium: '',
      large: '',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const imageSizeMap: Record<NonNullable<EmptyProps['size']>, { width: number; height: number; textClass: string }> = {
  small: { width: 48, height: 48, textClass: 'text-200 leading-200' },
  medium: { width: 80, height: 80, textClass: 'text-300 leading-300' },
  large: { width: 120, height: 120, textClass: 'text-400 leading-400' },
};

function DefaultImage({ width, height }: { width: number; height: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-neutral-foreground-3"
      aria-hidden="true"
    >
      <rect
        x="16"
        y="20"
        width="48"
        height="40"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M16 30h48"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="24" cy="25" r="2" fill="currentColor" />
      <circle cx="32" cy="25" r="2" fill="currentColor" />
      <circle cx="40" cy="25" r="2" fill="currentColor" />
      <rect
        x="28"
        y="38"
        width="24"
        height="2"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="32"
        y="44"
        width="16"
        height="2"
        rx="1"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      image,
      description = 'No data',
      size = 'medium',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { width, height, textClass } = imageSizeMap[size];

    return (
      <div
        ref={ref}
        className={cn(emptyVariants({ size }), className)}
        {...props}
      >
        <div className="flex items-center justify-center">
          {image ?? <DefaultImage width={width} height={height} />}
        </div>
        {description && (
          <p className={cn(textClass, 'text-neutral-foreground-2 text-center')}>
            {description}
          </p>
        )}
        {children && (
          <div className="flex items-center gap-s">{children}</div>
        )}
      </div>
    );
  },
);

Empty.displayName = 'Empty';
