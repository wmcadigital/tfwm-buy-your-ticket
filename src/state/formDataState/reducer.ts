// import { TSectionAndStep } from 'types/sectionAndStep';
import { TSession } from 'types/session';
import { TApiTicket } from 'types/ticket';
import { TFormDataState, TFormDataStateKey, TFormDataStateReducer } from './types';

const reducer: TFormDataStateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_SESSION_DATA': {
      const session = payload as TSession;

      return {
        ...state,
        ...session,
      };
    }

    case 'UPDATE_TICKET_DATA': {
      const apiTicketData = payload as Partial<TApiTicket>;

      return {
        ...state,
        ticketId: apiTicketData?.id || null,
        ticketPrice: apiTicketData?.ticketCurrentAmount || null,
      };
    }

    case 'UPDATE_FORM_DATA': {
      const newData = payload as Partial<TFormDataState>;

      return {
        ...state,
        ...newData,
      };
    }

    case 'CLEAR_FORM_DATA': {
      const valuesToClear = payload as TFormDataStateKey[];

      const dataToClear = valuesToClear.reduce((acc, name) => {
        return {
          ...acc,
          [name]: null,
        };
      }, {});

      return {
        ...state,
        ...dataToClear,
      };
    }

    case 'CLEAR_TICKET_HOLDER_DATA': {
      const keysToClear = (Object.keys(state) as TFormDataStateKey[]).filter((formDataKey) => {
        return formDataKey.indexOf('ticketHolder') > -1 || formDataKey === 'filename';
      });

      const dataToClear = keysToClear.reduce((acc, name) => {
        return {
          ...acc,
          [name]: null,
        };
      }, {});

      return {
        ...state,
        ...dataToClear,
      };
    }

    case 'CLEAR_PAYER_DATA': {
      const keysToClear = (Object.keys(state) as TFormDataStateKey[]).filter((formDataKey) => {
        return formDataKey.indexOf('payer') > -1 || formDataKey === 'filename';
      });

      const dataToClear = keysToClear.reduce((acc, name) => {
        return {
          ...acc,
          [name]: null,
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
