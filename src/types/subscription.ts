import { Nullable } from './helpers';
import { TError } from './validation';

export type TSectionAndStep = {
  section: number;
  step: number;
};

export type TSubscription<T = any> = {
  savedValue: Nullable<T>;
  subscriptions: TSectionAndStep[];
};

export type TSubscriptionReturn<T> = {
  currentValue: T | null;
  set: (newValue: T) => void;
  save: () => boolean;
  error: Nullable<TError>;
  hasError: boolean;
  validate: () => boolean;
};
