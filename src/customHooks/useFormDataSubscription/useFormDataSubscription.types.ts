import { TFormDataStateItem } from 'state/formDataState/types';
import { TSubscriptionReturn } from 'types/subscription';

export type TUseFormDataSubscription = (dataNames: TFormDataStateItem[]) => TSubscriptionReturn[];
