import { TSectionAndStep } from 'types/subscription';
import { TTicket } from 'types/ticket';
import { TGlobalStateReducer, TGlobalStateHistory } from './types';

const reducer: TGlobalStateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'START_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          isStarted: true,
          currentSection: 1,
          currentStep: 1,
          history: {
            ...state.form.history,
            index: 0,
          },
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

    case 'UPDATE_HISTORY': {
      const newHistory = payload as TGlobalStateHistory;

      return {
        ...state,
        form: {
          ...state.form,
          history: {
            ...state.form.history,
            ...newHistory,
          },
        },
      };
    }

    case 'GO_TO_STEP': {
      const newStep = payload as number;

      return {
        ...state,
        form: {
          ...state.form,
          currentStep: newStep,
          history: {
            ...state.form.history,
            index: state.form.history.index + 1,
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
            index: state.form.history.index + 1,
          },
        },
      };
    }

    case 'GO_TO_SECTION_AND_STEP': {
      const { section: newSection, step: newStep } = payload as TSectionAndStep;

      return {
        ...state,
        form: {
          ...state.form,
          currentSection: newSection,
          currentStep: newStep,
          history: {
            ...state.form.history,
            index: state.form.history.index + 1,
          },
        },
      };
    }

    case 'GO_BACK': {
      const { history, isFinished } = state.form;
      // If the user is on the first step then just show the start page
      if (history.index === 0) {
        return {
          ...state,
          form: {
            ...state.form,
            isFinished: false,
            isStarted: false,
            currentSection: 0,
            currentStep: 0,
            history: {
              ...state.form.history,
              index: -1,
            },
          },
        };
      }

      // Step the history index back by one
      const newHistoryIndex = isFinished ? history.index : history.index - 1;
      const lastHistoryItem = history.path[newHistoryIndex];

      return {
        ...state,
        form: {
          ...state.form,
          isFinished: false,
          currentSection: lastHistoryItem.section,
          currentStep: lastHistoryItem.step,
          history: {
            ...state.form.history,
            index: newHistoryIndex,
          },
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
