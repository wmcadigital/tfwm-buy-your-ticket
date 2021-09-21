import { getSearchParam } from 'helpers/URLSearchParams';
import { TGlobalState } from './types';

const initialState: TGlobalState = {
  form: {
    isStarted: true, //
    isFinished: false,
    isSubmitted: false,
    isEditing: false,
    currentSection: 2, //
    currentStep: 4, //
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
};

export default initialState;
