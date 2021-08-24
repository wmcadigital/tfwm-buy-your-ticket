import { TAddressSubscription } from '../AddressStep.types';

export type TAddressAutocompleteProps = {
  handleNotFound: () => void;
  address: TAddressSubscription;
};
