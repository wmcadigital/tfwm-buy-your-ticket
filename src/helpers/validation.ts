import { TFormDataStateValue } from 'state/formDataState/types';

type ValidationRules = 'NOT_EMPTY';

export const validate = (
  value: TFormDataStateValue,
  validationRules: ValidationRules[],
): boolean => {
  if (!validationRules.length) return true;

  const numberToBeValid = validationRules.length;
  let counter = 0;

  // Not empty
  if (validationRules.indexOf('NOT_EMPTY') >= 0) {
    const isValueEmpty = value === null || (typeof value === 'string' && value?.trim() === '');
    if (!isValueEmpty) counter += 1;
  }

  return counter >= numberToBeValid;
};

export const isValidDateNumber = (value: string, minValue: number, maxValue: number): boolean => {
  const dateNumber = parseInt(value, 10);
  if (Number.isNaN(dateNumber)) return false;

  const minDigits = minValue.toString().length;
  const maxDigits = maxValue.toString().length;
  const regex = new RegExp(`^[0-9]{${minDigits},${maxDigits}}$`, 'g');

  return dateNumber >= minValue && dateNumber <= maxValue && regex.test(value);
};
