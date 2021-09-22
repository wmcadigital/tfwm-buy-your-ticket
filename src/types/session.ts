import { Nullable } from './helpers';

export type TSession = {
  id: string;
  sessionNo: number;
  createdDateTime: Nullable<Date>;
  token: Nullable<string>;
};

// export type TSessionFormData = {
//   [key in TFormDataStateKey]: null;
// };

// export type TFullSession = TSession & TSessionFormData;
