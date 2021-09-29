import { TValidationConfig } from 'helpers/validation';
import { TFormDataState, TFormDataStateKey } from 'state/formDataState/types';
import { TSubscription, TSubscriptionReturn } from 'types/subscription';

export type TUseFormDataSubscription = <T extends TFormDataStateKey>(
  dataName: T,
  validationConfig?: TValidationConfig[],
) => TSubscriptionReturn<
  TFormDataState[T] extends TSubscription ? TFormDataState[T]['savedValue'] : TFormDataState[T]
>;
