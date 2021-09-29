import { TSession } from 'types/session';
import { TSectionAndStep } from 'types/subscription';
import { TTicket } from 'types/ticket';
import { TGlobalStateReducer, TGlobalStateHistory, TSectionAndStepRange } from './types';

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

    case 'UPDATE_SESSION_DATA': {
      const session = payload as TSession;

      return {
        ...state,
        session: {
          ...state.session,
          createdDateTime: session.createdDateTime,
          id: session.id,
          sessionNo: session.sessionNo,
        },
      };
    }

    case 'SHOW_SUMMARY_PAGE':
      return {
        ...state,
        form: {
          ...state.form,
          currentSection: 0,
          currentStep: 0,
          isFinished: true,
          isEditing: false,
          edit: {
            ...state.form.edit,
            from: null,
            to: null,
          },
        },
      };

    case 'EDIT_FORM': {
      let to: TSectionAndStep;
      let from: TSectionAndStep;

      if ((payload as TSectionAndStepRange)?.from && (payload as TSectionAndStepRange)?.to) {
        from = (payload as TSectionAndStepRange).from;
        to = (payload as TSectionAndStepRange).to;
      } else {
        from = payload as TSectionAndStep;
        to = payload as TSectionAndStep;
      }

      return {
        ...state,
        form: {
          ...state.form,
          currentSection: from.section,
          currentStep: from.step,
          isFinished: false,
          isEditing: true,
          edit: {
            ...state.form.edit,
            from,
            to,
          },
        },
      };
    }

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
