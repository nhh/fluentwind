import { forwardRef, useState, useRef, useCallback, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { MentionsProps, MentionOption } from './Mentions.types';

const textareaVariants = cva(
  'w-full text-neutral-foreground-1 placeholder:text-neutral-foreground-4 outline-none transition-colors duration-fast focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-stroke-focus-1',
  {
    variants: {
      appearance: {
        outline:
          'bg-neutral-background-1 border border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-visible:border-brand-stroke-1',
        underline:
          'bg-transparent-background border-b border-neutral-stroke-1 hover:border-neutral-stroke-1-hover focus-visible:border-brand-stroke-1',
        filledDarker:
          'bg-neutral-background-3 border border-transparent border-b-neutral-stroke-accessible focus-visible:border-b-brand-stroke-1',
        filledLighter:
          'bg-neutral-background-1 border border-transparent border-b-neutral-stroke-accessible focus-visible:border-b-brand-stroke-1',
      },
      size: {
        small: 'text-200 leading-200 px-s py-xxs rounded-medium',
        medium: 'text-300 leading-300 px-s py-xs rounded-medium',
        large: 'text-400 leading-400 px-m py-s rounded-large',
      },
    },
    defaultVariants: {
      appearance: 'outline',
      size: 'medium',
    },
  },
);

export const Mentions = forwardRef<HTMLTextAreaElement, MentionsProps>(
  (
    {
      options,
      prefix: mentionPrefix = '@',
      value: controlledValue,
      defaultValue = '',
      onChange,
      onSelect,
      appearance,
      size,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const [query, setQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mentionStart, setMentionStart] = useState<number | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase()),
    );

    const setValue = useCallback(
      (newValue: string) => {
        setInternalValue(newValue);
        onChange?.(newValue);
      },
      [onChange],
    );

    const handleInput = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        const cursorPos = e.target.selectionStart ?? 0;
        setValue(newValue);

        // Look backwards from cursor for the prefix character
        const textBeforeCursor = newValue.slice(0, cursorPos);
        const lastPrefixIdx = textBeforeCursor.lastIndexOf(mentionPrefix);

        if (lastPrefixIdx !== -1) {
          const textAfterPrefix = textBeforeCursor.slice(lastPrefixIdx + mentionPrefix.length);
          // Only trigger if there's no space after the prefix (active mention)
          if (!/\s/.test(textAfterPrefix)) {
            setQuery(textAfterPrefix);
            setMentionStart(lastPrefixIdx);
            setShowDropdown(true);
            setActiveIndex(0);
            return;
          }
        }

        setShowDropdown(false);
        setMentionStart(null);
      },
      [mentionPrefix, setValue],
    );

    const selectOption = useCallback(
      (option: MentionOption) => {
        if (mentionStart === null || !textareaRef.current) return;

        const cursorPos = textareaRef.current.selectionStart ?? 0;
        const before = value.slice(0, mentionStart);
        const after = value.slice(cursorPos);
        const newValue = `${before}${mentionPrefix}${option.label} ${after}`;

        setValue(newValue);
        setShowDropdown(false);
        setMentionStart(null);
        onSelect?.(option);

        // Restore focus and set cursor after the inserted mention
        requestAnimationFrame(() => {
          const textarea = textareaRef.current;
          if (textarea) {
            const newCursorPos = before.length + mentionPrefix.length + option.label.length + 1;
            textarea.focus();
            textarea.setSelectionRange(newCursorPos, newCursorPos);
          }
        });
      },
      [mentionStart, value, mentionPrefix, setValue, onSelect],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!showDropdown || filteredOptions.length === 0) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          selectOption(filteredOptions[activeIndex]);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setShowDropdown(false);
          setMentionStart(null);
        }
      },
      [showDropdown, filteredOptions, activeIndex, selectOption],
    );

    // Scroll active item into view
    useEffect(() => {
      if (showDropdown && dropdownRef.current) {
        const activeEl = dropdownRef.current.children[activeIndex] as HTMLElement | undefined;
        activeEl?.scrollIntoView({ block: 'nearest' });
      }
    }, [activeIndex, showDropdown]);

    const setRefs = useCallback(
      (el: HTMLTextAreaElement | null) => {
        (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref)
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
      },
      [ref],
    );

    return (
      <div className="relative">
        <textarea
          ref={setRefs}
          value={value}
          disabled={disabled}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          className={cn(
            textareaVariants({ appearance, size }),
            disabled && 'opacity-50 cursor-not-allowed bg-neutral-background-disabled',
            className,
          )}
          {...props}
        />
        {showDropdown && filteredOptions.length > 0 && (
          <div
            ref={dropdownRef}
            role="listbox"
            className="absolute left-0 z-50 mt-xxs w-full max-h-[200px] overflow-y-auto bg-neutral-background-1 text-neutral-foreground-1 shadow-8 rounded-medium border border-neutral-stroke-1 py-xs animate-[fw-fade-slide-in_150ms_var(--ease-decelerate-mid)]"
          >
            {filteredOptions.map((option, index) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectOption(option);
                }}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  'flex items-center w-full text-left px-m py-s gap-s text-300 leading-300 cursor-pointer outline-none transition-colors duration-fast',
                  index === activeIndex && 'bg-subtle-background-hover',
                )}
              >
                {option.avatar && (
                  <img
                    src={option.avatar}
                    alt=""
                    className="w-[24px] h-[24px] rounded-full object-cover shrink-0"
                  />
                )}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);

Mentions.displayName = 'Mentions';
