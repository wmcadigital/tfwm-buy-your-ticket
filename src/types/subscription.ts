import { Nullable } from './helpers';

export type TSubscription<T = any> = {
  value: Nullable<T>;
  section: number;
  step: number;
  isSubscribed: boolean;
};

export type TSubscriptionReturn = {
  value: string | number | boolean | Date;
  set: (newValue: string | number | boolean | Date) => void;
};
