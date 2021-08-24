import { Nullable } from 'types/helpers';
import { TSubscriptionReturn } from 'types/subscription';

export type TAddressSubscription = {
  addressLine1: TSubscriptionReturn<Nullable<string>>;
  addressLine2: TSubscriptionReturn<Nullable<string>>;
  addressLine3: TSubscriptionReturn<Nullable<string>>;
  addressLine4: TSubscriptionReturn<Nullable<string>>;
  postcode: TSubscriptionReturn<Nullable<Nullable<string>>>;
};
