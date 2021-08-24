import { TFormDataStateKey } from 'state/formDataState/types';
import { TTicket } from 'types/ticket';
import { TGlobalStateReducer, TGlobalStateHistory } from './types';

const reducer: TGlobalStateReducer = (state, action) => {
  const { type, payload } = action;

  const getNewHistory = (): TGlobalStateHistory[] => {
    const currentHistory = state.form.history.current;
    const { currentSection, currentStep, currentSubscriptions } = state.form;
    return [
      ...currentHistory,
      { section: currentSection, step: currentStep, subscriptions: currentSubscriptions },
    ];
  };

  switch (type) {
    case 'START_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          isStarted: true,
          currentSection: 1,
          currentStep: 1,
        },
      };

    case 'SHOW_SUMMARY_PAGE':
      return {
        ...state,
        form: {
          ...state.form,
          isFinished: true,
        },
      };

    case 'ADD_TICKET_INFO':
      return {
        ...state,
        ticket: payload as TTicket,
      };

    case 'GO_TO_STEP': {
      const newStep = payload as number;

      return {
        ...state,
        form: {
          ...state.form,
          currentStep: newStep,
          history: {
            ...state.form.history,
            current: getNewHistory(),
          },
        },
      };
    }

    case 'GO_TO_SECTION': {
      const newSection = payload as number;

      return {
        ...state,
        form: {
          ...state.form,
          currentSection: newSection,
          currentStep: 1,
          history: {
            ...state.form.history,
            current: getNewHistory(),
          },
        },
      };
    }

    case 'GO_TO_SECTION_AND_STEP': {
      const { section, step } = payload as TGlobalStateHistory;

      return {
        ...state,
        form: {
          ...state.form,
          isFinished: false,
          currentSection: section,
          currentStep: step,
          history: {
            ...state.form.history,
            current: getNewHistory(),
          },
        },
      };
    }

    case 'GO_BACK': {
      const currentHistory = state.form.history.current;
      const previousHistory = state.form.history.previous;

      const lastSectionAndStep = currentHistory[currentHistory.length - 1];
      const hasCurrentHistory = currentHistory.length > 0;

      const isBeyondPreviousHistory = currentHistory.length > previousHistory.length;
      const hasChangedHistory = currentHistory.every(({ section, step }, index) => {
        return section === previousHistory[index].section && step === previousHistory[index].step;
      });
      const shouldUpdatePreviousHistory = hasChangedHistory || isBeyondPreviousHistory;

      return {
        ...state,
        form: {
          ...state.form,
          isFinished: false,
          history: {
            // Set the previous history as longest path in current history
            previous: shouldUpdatePreviousHistory ? currentHistory : previousHistory,
            current: hasCurrentHistory ? currentHistory.slice(0, currentHistory.length - 1) : [],
          },
          // Go to the last section / step in history
          currentSection: lastSectionAndStep.section,
          currentStep: lastSectionAndStep.step,
        },
      };
    }

    case 'SUBSCRIBE_TO_FORM_DATA': {
      const dataName = payload as TFormDataStateKey;
      const { currentSubscriptions } = state.form;
      const newCurrentSubscriptions = [...currentSubscriptions, dataName];

      return {
        ...state,
        form: {
          ...state.form,
          currentSubscriptions: newCurrentSubscriptions,
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
