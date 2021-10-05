import initialState from 'state/formDataState/initialState';
import { TFormDataStateKey } from 'state/formDataState/types';

const getInitialValue = (dataName: TFormDataStateKey) => {
  return initialState[dataName];
};

export default getInitialValue;
