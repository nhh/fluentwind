import { forwardRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { PasswordInputProps } from './PasswordInput.types';

const wrapperVariants = cva(
  'fw-input-underline inline-flex items-center w-full border rounded-medium transition-colors duration-fast',
  {
    variants: {
      appearance: {
        outline:
          'bg-neutral-background-1 border-neutral-stroke-1 hover:border-neutral-stroke-1-hover',
        underline:
          'bg-transparent-background border-transparent border-b-neutral-stroke-1 hover:border-b-neutral-stroke-1-hover',
        filledDarker:
          'bg-neutral-background-3 border-transparent border-b-neutral-stroke-accessible',
        filledLighter:
          'bg-neutral-background-1 border-transparent border-b-neutral-stroke-accessible',
      },
      size: {
        small: 'text-200 leading-200 px-s py-xxs min-h-6',
        medium: 'text-300 leading-300 px-s py-xs min-h-8',
        large: 'text-400 leading-400 px-m py-s min-h-10',
      },
    },
    defaultVariants: {
      appearance: 'outline',
      size: 'medium',
    },
  },
);

const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3.26 10.94a1.18 1.18 0 0 1 0-.88C4.44 7.15 7.02 5 10 5s5.56 2.15 6.74 5.06c.15.28.15.6 0 .88C15.56 13.85 12.98 16 10 16s-5.56-2.15-6.74-5.06Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8.54 4.18A6.6 6.6 0 0 1 10 4c3.18 0 5.88 2.26 7 5.5a8.84 8.84 0 0 1-1.42 2.58M5.42 5.42A8.97 8.97 0 0 0 3 9.5C4.12 12.74 6.82 15 10 15c1.38 0 2.68-.42 3.8-1.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.17 8.17a2.5 2.5 0 0 0 3.54 3.54M2.5 2.5l15 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ appearance, size, showToggle = true, disabled, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <span
        className={cn(
          wrapperVariants({ appearance, size }),
          disabled &&
            'opacity-50 cursor-not-allowed bg-neutral-background-disabled border-neutral-stroke-disabled',
          className,
        )}
      >
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-neutral-foreground-1 placeholder:text-neutral-foreground-4 disabled:cursor-not-allowed min-w-0"
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            aria-label={visible ? 'Hide password' : 'Show password'}
            onClick={() => setVisible((v) => !v)}
            className="shrink-0 text-neutral-foreground-3 hover:text-neutral-foreground-1 transition-colors duration-fast disabled:cursor-not-allowed focus:outline-none"
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </span>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
