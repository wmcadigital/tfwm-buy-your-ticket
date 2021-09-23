import { TFormDataStateValue } from 'state/formDataState/types';
import { Nullable } from 'types/helpers';
import { TError } from 'types/validation';

export type TValidationRule = 'MANDATORY' | 'OPTIONAL' | 'EMAIL' | 'PHONE_NUMBER' | 'NUMBER';

export type TValidationConfig = {
  rule: TValidationRule;
  message?: string;
};

export type TValidationReturn = {
  isValid: boolean;
  error: Nullable<TError>;
};

export type TCheckForRule = (
  validationConfig: TValidationConfig[],
  ruleName: TValidationRule,
) => Nullable<TValidationConfig>;

export type TValidate = (
  value: TFormDataStateValue,
  config: TValidationConfig[],
) => TValidationReturn;
