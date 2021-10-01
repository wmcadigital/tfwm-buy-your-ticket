import { Nullable } from './helpers';
import { TError } from './validation';

export type TSubscriptionReturn<T> = {
  savedValue: T | null;
  currentValue: T | null;
  set: (newValue: T) => void;
  save: () => boolean;
  error: Nullable<TError>;
  hasError: boolean;
  validate: () => boolean;
};
