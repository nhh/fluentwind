import type { HTMLAttributes } from 'react';

export interface MentionOption {
  value: string;
  label: string;
  avatar?: string;
}

export interface MentionsProps
  extends Omit<HTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'defaultValue' | 'onSelect'> {
  options: MentionOption[];
  prefix?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: MentionOption) => void;
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
}
