import { TCheckForRule, TValidate } from './validation.types';

const checkForRule: TCheckForRule = (validationConfig, ruleName) => {
  if (!validationConfig.length) return null;
  const ruleIndex = validationConfig.findIndex((config) => config.rule === ruleName);
  if (ruleIndex < 0) return null;
  return validationConfig[ruleIndex];
};

export const validate: TValidate = (value, config) => {
  // MANDATORY
  const optionalRule = checkForRule(config, 'OPTIONAL');
  const mandatoryRule = checkForRule(config, 'MANDATORY');
  if (!optionalRule || mandatoryRule) {
    const isValueEmpty = value === null || (typeof value === 'string' && value?.trim() === '');
    if (isValueEmpty) {
      const message = mandatoryRule?.message || 'This field is mandatory';
      return { isValid: false, error: { message } };
    }
  }

  const mandatoryBooleanRule = checkForRule(config, 'MANDATORY');
  if (mandatoryBooleanRule) {
    const isFalseOrEmpty = typeof value === 'boolean' && !value;
    if (isFalseOrEmpty) {
      const message = mandatoryRule?.message || 'This field is mandatory';
      return { isValid: false, error: { message } };
    }
  }

  // EMAIL
  const emailRule = checkForRule(config, 'EMAIL');
  if (emailRule) {
    const regex = new RegExp(
      '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
      'g',
    );
    const isValidEmail = regex.test(`${value}`);
    if (!isValidEmail) {
      const message = emailRule.message || 'Please enter a valid email address';
      return { isValid: false, error: { message } };
    }
  }

  // PHONE NUMBER
  const phoneNumberRule = checkForRule(config, 'PHONE_NUMBER');
  if (phoneNumberRule) {
    const regex = new RegExp('^[0-9]{11}$', 'g');
    const isValidPhoneNumber = regex.test(`${value}`);
    if (!isValidPhoneNumber) {
      const message = phoneNumberRule.message || 'Please enter a valid phone number';
      return { isValid: false, error: { message } };
    }
  }

  // NUMBER
  const numberRule = checkForRule(config, 'NUMBER');
  if (numberRule) {
    const regex = new RegExp('^[0-9]*$', 'g');
    const isValidEmail = regex.test(`${value}`);
    if (!isValidEmail) {
      const message = numberRule.message || 'Please enter a valid number';
      return { isValid: false, error: { message } };
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
