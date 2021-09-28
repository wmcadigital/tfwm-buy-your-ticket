// import { getSearchParam } from 'helpers/URLSearchParams';
import { TGlobalState } from './types';

const initialState: TGlobalState = {
  // form: {
  //   isStarted: false, //
  //   isFinished: false,
  //   isSubmitted: false,
  //   isEditing: false,
  //   currentSection: 0, //
  //   currentStep: 0, //
  //   history: {
  //     index: -1,
  //     path: [],
  //   },
  // },
  // ticket: {
  //   id: parseInt(getSearchParam('ticketId') as string, 10) || -1,
  //   name: '',
  //   modes: [],
  //   priceString: '',
  //   availableDates: [],
  // },
  // session: {
  //   id: '',
  //   sessionNo: 0,
  //   createdDateTime: null,
  //   token: '',
  // },

  form: {
    isStarted: true,
    isFinished: true,
    isSubmitted: false,
    isEditing: false,
    currentSection: 4,
    currentStep: 2,
    history: {
      index: 12,
      path: [
        { section: 1, step: 1 },
        { section: 1, step: 2 },
        { section: 1, step: 4 },
        { section: 2, step: 1 },
        { section: 2, step: 2 },
        { section: 2, step: 3 },
        { section: 2, step: 4 },
        { section: 3, step: 1 },
        { section: 3, step: 2 },
        { section: 3, step: 3 },
        { section: 3, step: 4 },
        { section: 4, step: 1 },
        { section: 4, step: 2 },
      ],
    },
  },
  ticket: {
    id: 2,
    name: '1 week nnetwork Zones 1-2',
    modes: ['bus', 'rail'],
    priceString: '£27.50 per week',
    availableDates: [new Date()],
  },
  session: {
    id: '8a2450d4-e541-45ad-9fe4-7ab97bf026a0',
    sessionNo: 30,
    createdDateTime: new Date(),
    token: '',
  },
};

export default initialState;
