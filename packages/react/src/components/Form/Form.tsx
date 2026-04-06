import {
  forwardRef,
  useState,
  useCallback,
  useRef,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { cn } from '../../utils/cn';
import type {
  FormProps,
  FormFieldProps,
  UseFormOptions,
  UseFormReturn,
  ValidationRule,
} from './Form.types';

// --- Validation helpers ---

function runRules(value: any, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    if (rule.required && (value === undefined || value === null || value === '')) {
      return rule.message ?? 'This field is required';
    }
    if (rule.minLength != null && typeof value === 'string' && value.length < rule.minLength) {
      return rule.message ?? `Minimum length is ${rule.minLength}`;
    }
    if (rule.maxLength != null && typeof value === 'string' && value.length > rule.maxLength) {
      return rule.message ?? `Maximum length is ${rule.maxLength}`;
    }
    if (rule.min != null && typeof value === 'number' && value < rule.min) {
      return rule.message ?? `Minimum value is ${rule.min}`;
    }
    if (rule.max != null && typeof value === 'number' && value > rule.max) {
      return rule.message ?? `Maximum value is ${rule.max}`;
    }
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return rule.message ?? 'Invalid format';
    }
    if (rule.validate) {
      const result = rule.validate(value);
      if (result === false) return rule.message ?? 'Invalid value';
      if (typeof result === 'string') return result;
    }
  }
  return null;
}

// --- Form context ---

interface FormContextValue extends UseFormReturn {
  registerField: (name: string, rules: ValidationRule[]) => void;
  unregisterField: (name: string) => void;
  disabled?: boolean;
}

const FormContext = createContext<FormContextValue | null>(null);

// --- useForm hook ---

export function useForm(options: UseFormOptions = {}): UseFormReturn {
  const { defaultValues = {}, onSubmit } = options;

  const [values, setValues] = useState<Record<string, any>>({ ...defaultValues });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldRulesRef = useRef<Record<string, ValidationRule[]>>({});

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name: string, error: string | null) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string | null> = {};
    let valid = true;
    for (const [name, rules] of Object.entries(fieldRulesRef.current)) {
      const error = runRules(values[name], rules);
      newErrors[name] = error;
      if (error) valid = false;
    }
    setErrors(newErrors);
    return valid;
  }, [values]);

  const reset = useCallback(() => {
    setValues({ ...defaultValues });
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [defaultValues]);

  const getFieldProps = useCallback(
    (name: string) => ({
      value: values[name] ?? '',
      onChange: (e: any) => {
        const val = e?.target ? e.target.value : e;
        setValues((prev) => ({ ...prev, [name]: val }));
      },
      onBlur: () => {
        setTouched((prev) => ({ ...prev, [name]: true }));
        // Validate on blur if rules exist
        const rules = fieldRulesRef.current[name];
        if (rules) {
          const error = runRules(values[name], rules);
          setErrors((prev) => ({ ...prev, [name]: error }));
        }
      },
      name,
    }),
    [values],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      // Mark all fields as touched
      const allTouched: Record<string, boolean> = {};
      for (const name of Object.keys(fieldRulesRef.current)) {
        allTouched[name] = true;
      }
      setTouched((prev) => ({ ...prev, ...allTouched }));

      if (!validate()) return;

      if (onSubmit) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [validate, onSubmit, values],
  );

  const isValid = useMemo(
    () => Object.values(errors).every((e) => e === null || e === undefined),
    [errors],
  );

  const formReturn = useMemo<UseFormReturn>(
    () => ({
      values,
      errors,
      touched,
      isValid,
      isSubmitting,
      getFieldProps,
      setFieldValue,
      setFieldError,
      validate,
      reset,
      handleSubmit,
    }),
    [values, errors, touched, isValid, isSubmitting, getFieldProps, setFieldValue, setFieldError, validate, reset, handleSubmit],
  );

  // Expose fieldRulesRef for internal use by FormContext
  (formReturn as any).__fieldRulesRef = fieldRulesRef;

  return formReturn;
}

// --- Form component ---

export const Form = forwardRef<HTMLFormElement, FormProps & { form?: UseFormReturn }>(
  ({ form: formProp, disabled, className, children, onSubmit, ...props }, ref) => {
    const internalForm = useForm();
    const form = formProp ?? internalForm;
    const fieldRulesRef: React.MutableRefObject<Record<string, ValidationRule[]>> =
      (form as any).__fieldRulesRef ?? { current: {} };

    const registerField = useCallback(
      (name: string, rules: ValidationRule[]) => {
        fieldRulesRef.current[name] = rules;
      },
      [fieldRulesRef],
    );

    const unregisterField = useCallback(
      (name: string) => {
        delete fieldRulesRef.current[name];
      },
      [fieldRulesRef],
    );

    const ctxValue = useMemo<FormContextValue>(
      () => ({
        ...form,
        registerField,
        unregisterField,
        disabled,
      }),
      [form, registerField, unregisterField, disabled],
    );

    return (
      <FormContext.Provider value={ctxValue}>
        <form
          ref={ref}
          onSubmit={form.handleSubmit}
          className={cn('flex flex-col gap-m', className)}
          {...props}
        >
          <fieldset disabled={disabled} className="contents">
            {children}
          </fieldset>
        </form>
      </FormContext.Provider>
    );
  },
);

Form.displayName = 'Form';

// --- FormField component ---

export function FormField({ name, label, rules = [], children, hint, required }: FormFieldProps) {
  const ctx = useContext(FormContext);

  useEffect(() => {
    if (!ctx) return;
    const effectiveRules = required && !rules.some((r) => r.required)
      ? [{ required: true, message: 'This field is required' }, ...rules]
      : rules;
    ctx.registerField(name, effectiveRules);
    return () => ctx.unregisterField(name);
  }, [ctx, name, rules, required]);

  const error = ctx?.errors[name];
  const isTouched = ctx?.touched[name];
  const showError = isTouched && error;
  const isRequired = required || rules.some((r) => r.required);

  return (
    <div className="flex flex-col gap-xxs">
      {label && (
        <label className="text-300 leading-300 text-neutral-foreground-1 font-normal cursor-default">
          {label}
          {isRequired && (
            <span className="text-status-danger-foreground-1 ml-xxs" aria-hidden="true">*</span>
          )}
        </label>
      )}
      {children}
      {showError ? (
        <span className="text-200 leading-200 text-status-danger-foreground-1">{error}</span>
      ) : hint ? (
        <span className="text-200 leading-200 text-neutral-foreground-3">{hint}</span>
      ) : null}
    </div>
  );
}

FormField.displayName = 'FormField';
