import { arrayContainsSectionAndStep } from 'helpers/compareSectionAndStep';
import { TSectionAndStep, TSubscription } from 'types/subscription';
import { TFormDataStateItem, TFormDataStateKey, TFormDataStateReducer } from './types';

const reducer: TFormDataStateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_FORM_DATA': {
      const { name, value } = payload as TFormDataStateItem;

      if (typeof state[name] === 'object') {
        const current = state[name] as TSubscription;

        return {
          ...state,
          [name]: {
            ...current,
            savedValue: value,
          },
        };
      }

      return {
        ...state,
        [name]: value,
      };
    }

    case 'SUBSCRIBE_TO_FORM_DATA': {
      const { dataName, section, step } = payload as TSectionAndStep & {
        dataName: TFormDataStateKey;
      };
      const current = state[dataName] as TSubscription;
      const alreadySubscribed = arrayContainsSectionAndStep(current.subscriptions, {
        section,
        step,
      });

      const newSubscriptions = alreadySubscribed
        ? current.subscriptions
        : [...current.subscriptions, { section, step }];

      return {
        ...state,
        [dataName]: {
          ...current,
          subscriptions: newSubscriptions,
        },
      };
    }

    case 'CLEAR_SUBSCRIPTION_VALUES': {
      const sectionsAndSteps = payload as TSectionAndStep[];
      const valuesToClear = [] as TFormDataStateKey[];

      Object.entries(state).forEach((data) => {
        const [dataName, value] = data;
        if (typeof value !== 'object') return;

        const shouldClearValue = sectionsAndSteps.some((item) => {
          return value?.subscriptions.some((sub) => {
            return item.section === sub?.section && item.step === sub?.step;
          });
        });

        if (!shouldClearValue) return;
        valuesToClear.push(dataName as TFormDataStateKey);
      });

      // console.log(valuesToClear);

      const dataToClear = valuesToClear.reduce((acc, name) => {
        return {
          ...acc,
          [name]: {
            savedValue: null,
            subscriptions: [],
          },
        };
      }, {});

      return {
        ...state,
        ...dataToClear,
      };
    }

    default:
      return state;
  }
};

export default reducer;
