import { Nullable } from './helpers';

export type TSectionAndStep = {
  section: number;
  step: number;
};

export type TSubscription<T = any> = {
  value: Nullable<T>;
} & TSectionAndStep;

export type TSubscriptionReturn<T> = {
  value: T | null;
  set: (newValue: T) => void;
  save: () => void;
};
