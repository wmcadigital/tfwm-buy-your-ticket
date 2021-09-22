import { getSearchParam } from 'helpers/URLSearchParams';
import { TGlobalState } from './types';

const initialState: TGlobalState = {
  form: {
    isStarted: false,
    isFinished: false,
    isSubmitted: false,
    isEditing: false,
    currentSection: 0,
    currentStep: 0,
    history: {
      index: -1,
      path: [],
    },
  },
  ticket: {
    id: parseInt(getSearchParam('ticketId') as string, 10) || -1,
    name: '',
    modes: [],
    priceString: '',
    availableDates: [],
  },
  session: {
    id: '',
    sessionNo: 0,
    createdDateTime: null,
    token: '',
  },
};

export default initialState;
