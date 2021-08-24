import { TFormDataStateReducer } from './types';

const reducer: TFormDataStateReducer = (state, action) => {
  let data; // Helper for destructuring or casting types

  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      data = action.payload;

      return {
        ...state,
        [data.name]: data.value,
      };

    default:
      return state;
  }
};

export default reducer;
