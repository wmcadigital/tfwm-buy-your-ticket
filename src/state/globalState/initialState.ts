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
    history: [],
  },
  ticket: {
    id: parseInt(getSearchParam('ticketId') as string, 10) || -1,
    name: '',
    modes: [],
    priceString: '',
  },
};

export default initialState;
