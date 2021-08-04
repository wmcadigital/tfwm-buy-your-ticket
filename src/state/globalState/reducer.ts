import { TTicket } from 'types/ticket';
import { TGlobalStateReducer } from './types';

const reducer: TGlobalStateReducer = (state, action) => {
  const { type, payload } = action;
  let data; // Helper for destructuring or casting types

  const prevHistory = state.form.history.slice(0, state.form.history.length - 1);
  const nextHistory = [
    ...state.form.history,
    { section: state.form.currentSection, step: state.form.currentStep },
  ];

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
          // Only add to the history once
          history: state.form.isFinished ? state.form.history : nextHistory,
        },
      };

    case 'ADD_TICKET_INFO':
      return {
        ...state,
        ticket: payload as TTicket,
      };

    case 'GO_TO_SECTION':
      return {
        ...state,
        form: {
          ...state.form,
          currentSection: payload as number,
          currentStep: 1,
          history: nextHistory,
        },
      };

    case 'GO_TO_STEP':
      return {
        ...state,
        form: {
          ...state.form,
          currentStep: payload as number,
          history: nextHistory,
        },
      };

    case 'GO_TO_SECTION_AND_STEP':
      data = payload as { section: number; step: number };

      return {
        ...state,
        form: {
          ...state.form,
          isFinished: false,
          currentSection: data?.section,
          currentStep: data?.step,
          history: nextHistory,
        },
      };

    case 'GO_BACK':
      data = state.form.history;

      if (!data.length) {
        // Show start page
        return {
          ...state,
          form: {
            ...state.form,
            history: [],
            isStarted: false,
            isFinished: false,
          },
        };
      }

      return {
        ...state,
        form: {
          ...state.form,
          isFinished: false,
          history: prevHistory,
          // Go to the last section / step in history
          currentSection: data[data.length - 1].section,
          currentStep: data[data.length - 1].step,
        },
      };

    default:
      return state;
  }
};

export default reducer;
