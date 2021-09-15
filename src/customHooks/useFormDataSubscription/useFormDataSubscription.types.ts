import { TValidationRules } from 'helpers/validation';
import { TFormDataState, TFormDataStateKey } from 'state/formDataState/types';
import { TSubscription, TSubscriptionReturn } from 'types/subscription';

export type TUseFormDataSubscription = <T extends TFormDataStateKey>(
  dataName: T,
  validationTypes?: TValidationRules[],
) => TSubscriptionReturn<
  TFormDataState[T] extends TSubscription ? TFormDataState[T]['value'] : TFormDataState[T]
>;
