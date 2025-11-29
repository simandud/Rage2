/**
 * Validation utilities
 * Helper functions for form validation
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Spanish format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate password strength
 */
export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validate credit card number (Luhn algorithm)
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  const digits = cardNumber.replace(/\s/g, '');

  if (!/^\d+$/.test(digits)) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validate required field
 */
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Validate minimum length
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

/**
 * Validate maximum length
 */
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

/**
 * Validate number range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};
