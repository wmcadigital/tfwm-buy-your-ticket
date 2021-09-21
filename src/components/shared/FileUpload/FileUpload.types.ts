import { Nullable } from 'types/helpers';
import { TError } from 'types/validation';

export type TFileUploadProps = {
  name: string;
  error: Nullable<TError>;
  label?: string;
  hint?: string;
  defaultValue?: Nullable<string>;
  updateValue: (file: Nullable<string>) => void;
  accept?: string;
};
