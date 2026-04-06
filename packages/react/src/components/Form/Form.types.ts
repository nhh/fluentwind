import type { FormHTMLAttributes, ReactNode } from 'react';

export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: any) => boolean | string;
  message?: string;
}

export interface FormFieldState {
  value: any;
  error: string | null;
  touched: boolean;
}

export interface UseFormOptions {
  defaultValues?: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
}

export interface UseFormReturn {
  values: Record<string, any>;
  errors: Record<string, string | null>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  getFieldProps: (name: string) => {
    value: any;
    onChange: (e: any) => void;
    onBlur: () => void;
    name: string;
  };
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string | null) => void;
  validate: () => boolean;
  reset: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  disabled?: boolean;
}

export interface FormFieldProps {
  name: string;
  label?: ReactNode;
  rules?: ValidationRule[];
  children: ReactNode;
  hint?: ReactNode;
  required?: boolean;
}
