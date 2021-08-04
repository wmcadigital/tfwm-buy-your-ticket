import { TSubscription } from 'types/subscription';
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

    case 'UPDATE_SUBSCRIBED_FORM_DATA':
      data = action.payload;

      return {
        ...state,
        [data.name]: {
          ...(state[data.name] as TSubscription),
          value: data.value,
        },
      };

    case 'SUBSCRIBE_TO_FORM_DATA':
      data = action.payload;

      return data.reduce((accumulator, current) => {
        return {
          ...accumulator,
          [current.name]: {
            ...(accumulator[current.name] as TSubscription),
            name: current.name,
            section: current.section,
            step: current.step,
            isSubscribed: true,
          },
        };
      }, state);

    default:
      return state;
  }
};

export default reducer;
