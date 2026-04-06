import { forwardRef, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { AvatarProps, AvatarSize } from './Avatar.types';

const sizeMap: Record<AvatarSize, string> = {
  16: 'h-4 w-4 text-[8px]',
  20: 'h-5 w-5 text-[10px]',
  24: 'h-6 w-6 text-100',
  28: 'h-7 w-7 text-100',
  32: 'h-8 w-8 text-200',
  36: 'h-9 w-9 text-200',
  40: 'h-10 w-10 text-200',
  48: 'h-12 w-12 text-300',
  56: 'h-14 w-14 text-400',
  64: 'h-16 w-16 text-400',
  72: 'h-[72px] w-[72px] text-500',
  96: 'h-24 w-24 text-600',
  120: 'h-[120px] w-[120px] text-600',
  128: 'h-32 w-32 text-600',
};

const colorMap = {
  neutral: 'bg-neutral-background-6 text-neutral-foreground-3',
  brand: 'bg-brand-background text-neutral-foreground-on-brand',
  colorful: 'bg-brand-background-2 text-brand-foreground-2',
};

function getInitials(name?: string): string {
  if (!name) return '';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const PersonIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M10 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM7 12a3 3 0 0 0-3 3 2 2 0 0 0 2 2h8a2 2 0 0 0 2-2 3 3 0 0 0-3-3H7Z" />
  </svg>
);

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      name,
      image,
      initials: initialsProp,
      size = 32,
      shape = 'circular',
      color = 'neutral',
      active = 'unset',
      badge,
      className,
      ...props
    },
    ref,
  ) => {
    const initials = useMemo(
      () => initialsProp ?? getInitials(name),
      [initialsProp, name],
    );

    const sizeClass = sizeMap[size] ?? sizeMap[32];

    return (
      <span
        ref={ref}
        role="img"
        aria-label={name ?? 'avatar'}
        className={cn(
          'relative inline-flex items-center justify-center shrink-0 select-none font-semibold overflow-hidden',
          sizeClass,
          shape === 'circular' ? 'rounded-circular' : 'rounded-medium',
          colorMap[color],
          active === 'active' && 'ring-2 ring-brand-stroke-1 ring-offset-2',
          active === 'inactive' && 'opacity-60',
          className,
        )}
        {...props}
      >
        {image ? (
          <img
            src={image.src}
            alt={image.alt ?? name ?? ''}
            className="h-full w-full object-cover"
          />
        ) : initials ? (
          <span>{initials}</span>
        ) : (
          <PersonIcon className="h-1/2 w-1/2" />
        )}
        {badge && (
          <span className="absolute bottom-0 right-0 translate-x-[10%] translate-y-[10%]">
            {badge}
          </span>
        )}
      </span>
    );
  },
);

Avatar.displayName = 'Avatar';
