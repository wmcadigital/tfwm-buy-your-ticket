import { TFormDataStateValue } from 'state/formDataState/types';
import { Nullable } from 'types/helpers';
import { TError } from 'types/validation';

export type TValidationRules = 'NOT_EMPTY' | 'EMPTY_ALLOWED' | 'EMAIL' | 'PHONE_NUMBER';
export type TValidationReturn = {
  isValid: boolean;
  error: Nullable<TError>;
};

export const validate = (
  value: TFormDataStateValue,
  validationRules: TValidationRules[],
): TValidationReturn => {
  if (!validationRules.length) return { isValid: true, error: null };

  // Not empty
  if (
    validationRules.indexOf('NOT_EMPTY') >= 0 &&
    !(validationRules.indexOf('EMPTY_ALLOWED') >= 0)
  ) {
    const isValueEmpty = value === null || (typeof value === 'string' && value?.trim() === '');
    if (isValueEmpty) return { isValid: false, error: { message: 'This field is mandatory' } };
  }

  // Email
  if (validationRules.indexOf('EMAIL') >= 0) {
    const regex = new RegExp(
      '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
      'g',
    );
    const isValidEmail = regex.test(`${value}`);
    if (!isValidEmail) {
      return { isValid: false, error: { message: 'Please enter a valid email address' } };
    }
  }

  // Phone
  if (validationRules.indexOf('PHONE_NUMBER') >= 0) {
    const regex = new RegExp('^[0-9]{11}$', 'g');
    const isValidPhoneNumber = regex.test(`${value}`);
    if (!isValidPhoneNumber) {
      return { isValid: false, error: { message: 'Please enter a valid phone number' } };
    }
  }

  return { isValid: true, error: null };
};

export const isValidDateNumber = (value: string, minValue: number, maxValue: number): boolean => {
  const dateNumber = parseInt(value, 10);
  if (Number.isNaN(dateNumber)) return false;

  const minDigits = minValue.toString().length;
  const maxDigits = maxValue.toString().length;
  const regex = new RegExp(`^[0-9]{${minDigits},${maxDigits}}$`, 'g');

  return dateNumber >= minValue && dateNumber <= maxValue && regex.test(value);
};
