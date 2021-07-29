import { getSearchParam } from 'helpers/URLSearchParams';
import { TTicket } from 'types/ticket';
import { TGlobalState, TGlobalStateReducer } from './types';

export const initialState: TGlobalState = {
  form: {
    isStarted: false,
    isFinished: false,
    isSubmitted: false,
    editMode: false,
    currentSection: 0,
    currentStep: 0,
  },
  ticket: {
    id: parseInt(getSearchParam('ticketId') as string, 10) || -1,
    name: '',
    modes: [],
    priceString: '',
  },
};

export const reducer: TGlobalStateReducer = (state, action) => {
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
        },
      };

    case 'FINISH_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          isFinished: true,
        },
      };

    case 'SHOW_START_PAGE':
      return {
        ...state,
        form: {
          ...initialState.form,
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
        },
      };

    case 'GO_TO_STEP':
      return {
        ...state,
        form: {
          ...state.form,
          currentStep: payload as number,
        },
      };

    default:
      return state;
  }
};
