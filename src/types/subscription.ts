import { Nullable } from './helpers';

export type TSubscription<T = any> = {
  value: Nullable<T>;
  section: number;
  step: number;
  isSubscribed: boolean;
};

export type TSubscriptionReturn<T> = {
  value: T | null;
  set: (newValue: T) => void;
  save: () => void;
};
