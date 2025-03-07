import { useState, useCallback, ChangeEvent } from 'react';

type ValidationRule<T> = {
  validate: (value: T[keyof T]) => boolean;
  message: string;
};

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T>[];
};

type FormErrors<T> = {
  [K in keyof T]?: string;
};

interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit?: (values: T) => void | Promise<void>;
}

/**
 * Custom hook for form state management and validation
 * 
 * @param options Form options including initial values, validation rules, and submit handler
 * @returns Form state, handlers, and validation functions
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // Validate a single field
  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]): string | undefined => {
      const fieldRules = validationRules[name];
      if (!fieldRules) return undefined;

      for (const rule of fieldRules) {
        if (!rule.validate(value)) {
          return rule.message;
        }
      }

      return undefined;
    },
    [validationRules]
  );

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors<T> = {};
    let formIsValid = true;

    for (const key in validationRules) {
      const name = key as keyof T;
      const error = validateField(name, values[name]);
      
      if (error) {
        newErrors[name] = error;
        formIsValid = false;
      }
    }

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  }, [validateField, validationRules, values]);

  // Handle field change
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const fieldName = name as keyof T;
      
      // Handle different input types
      let fieldValue: any = value;
      if (type === 'checkbox') {
        fieldValue = (e.target as HTMLInputElement).checked;
      } else if (type === 'number') {
        fieldValue = value === '' ? '' : Number(value);
      }

      setValues((prev) => ({ ...prev, [fieldName]: fieldValue }));
      
      // Mark field as touched
      if (!touched[fieldName]) {
        setTouched((prev) => ({ ...prev, [fieldName]: true }));
      }
      
      // Validate field if it's been touched
      if (touched[fieldName]) {
        const error = validateField(fieldName, fieldValue);
        setErrors((prev) => ({ ...prev, [fieldName]: error }));
        
        // Update form validity
        const newErrors = { ...errors, [fieldName]: error };
        setIsValid(!Object.values(newErrors).some(Boolean));
      }
    },
    [errors, touched, validateField]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      const fieldName = name as keyof T;
      
      // Mark field as touched
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
      
      // Validate field
      const error = validateField(fieldName, values[fieldName]);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
      
      // Update form validity
      const newErrors = { ...errors, [fieldName]: error };
      setIsValid(!Object.values(newErrors).some(Boolean));
    },
    [errors, validateField, values]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<keyof T, boolean>
      );
      setTouched(allTouched);

      // Validate form
      const formIsValid = validateForm();
      
      if (formIsValid && onSubmit) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [onSubmit, validateForm, values]
  );

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({} as Record<keyof T, boolean>);
    setIsSubmitting(false);
    setIsValid(true);
  }, [initialValues]);

  // Set a specific field value programmatically
  const setFieldValue = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      
      // Validate field if it's been touched
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
        
        // Update form validity
        const newErrors = { ...errors, [name]: error };
        setIsValid(!Object.values(newErrors).some(Boolean));
      }
    },
    [errors, touched, validateField]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    validateForm,
  };
} 