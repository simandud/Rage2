
import { useState, ChangeEvent, FormEvent } from 'react';

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string;
}

interface UseFormProps {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<void>;
  validate: (values: FormValues) => FormErrors;
}

export const useForm = ({ initialValues, onSubmit, validate }: UseFormProps) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await onSubmit(values);
      setSubmitStatus('success');
      setValues(initialValues);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit
  };
};

// Helper de validación básico
export const validateContactForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  
  if (!values.name.trim()) errors.name = 'El nombre es obligatorio';
  
  if (!values.email) {
    errors.email = 'El email es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'El email no es válido';
  }
  
  if (!values.message.trim()) errors.message = 'El mensaje no puede estar vacío';
  
  return errors;
};
