import { TSubscription } from 'types/subscription';
import { TFormDataState } from './types';

const createSubscription = <T>(initialValue?: T): TSubscription<T> => {
  return {
    value: initialValue || null,
    section: 0,
    step: 0,
    isSubscribed: false,
  };
};

const initialState: TFormDataState = {
  sessionNo: null,
  id: null,
  onlineApplicationNo: null,
  submissionDate: null,
  onlineSalesTransactionId: null,
  createdDateTime: null,
  applicationForMe: null,
  startDate: createSubscription(),
  ticketId: null,
  ticketCode: null,
  addOn: null,
  promotionalCode: null,
  previousCustomer: createSubscription(),
  previousCustomerReferenceNumber: createSubscription(),
  currentSwiftcard: createSubscription(),
  currentSwiftcardNumber: createSubscription(),
  addProductToExistingCard: createSubscription(),
  isApprentice: createSubscription(),
  schoolName: createSubscription(),
  schoolPostcode: createSubscription(),
  employerName: createSubscription(),
  employerPostcode: createSubscription(),
  filename: createSubscription(),
  payerTitle: createSubscription(),
  payerFirstName: createSubscription(),
  payerLastName: createSubscription(),
  payerDateOfBirth: createSubscription(),
  payerHomePhoneNumber: createSubscription(),
  payerWorkPhoneNumber: createSubscription(),
  payerMobilePhoneNumber: createSubscription(),
  payerEmailAddress: createSubscription(),
  currentTimeAtAddressYears: createSubscription(),
  currentTimeAtAddressMonths: createSubscription(),
  previousTimeAtAddressYears: createSubscription(),
  previousTimeAtAddressMonths: createSubscription(),
  payerCurrentPostcode: createSubscription(),
  payerCurrentAddressLine1: createSubscription(),
  payerCurrentAddressLine2: createSubscription(),
  payerCurrentAddressLine3: createSubscription(),
  payerCurrentAddressLine4: createSubscription(),
  payerCurrentTown: createSubscription(),
  payerPreviousPostcode: createSubscription(),
  payerPreviousAddressLine1: createSubscription(),
  payerPreviousAddressLine2: createSubscription(),
  payerPreviousAddressLine3: createSubscription(),
  payerPreviousAddressLine4: createSubscription(),
  payerPreviousTown: createSubscription(),
  ticketHolderTitle: createSubscription(),
  ticketHolderFirstName: createSubscription(),
  ticketHolderLastName: createSubscription(),
  ticketHolderDateOfBirth: createSubscription(),
  ticketHolderHomePhoneNumber: createSubscription(),
  ticketHolderWorkPhoneNumber: createSubscription(),
  ticketHolderMobilePhoneNumber: createSubscription(),
  ticketHolderEmailAddress: createSubscription(),
  wouldLikeNetworkClubNews: createSubscription(),
  howDidYouHearAboutCentroDirectDebit: createSubscription(),
  ticketHolderCurrentPostcode: createSubscription(),
  ticketHolderCurrentAddressLine1: createSubscription(),
  ticketHolderCurrentAddressLine2: createSubscription(),
  ticketHolderCurrentAddressLine3: createSubscription(),
  ticketHolderCurrentAddressLine4: createSubscription(),
  ticketHolderCurrentTown: createSubscription(),
  ticketHolderPreviousPostcode: createSubscription(),
  ticketHolderPreviousAddressLine1: createSubscription(),
  ticketHolderPreviousAddressLine2: createSubscription(),
  ticketHolderPreviousAddressLine3: createSubscription(),
  ticketHolderPreviousAddressLine4: createSubscription(),
  ticketHolderPreviousTown: createSubscription(),
  accountName: createSubscription(),
  accountNumber: createSubscription(),
  sortCode: createSubscription(),
  relationshipToTicketHolder: createSubscription(),
  has16to18Card: createSubscription(),
  cardNumber16to18: createSubscription(),
  imported: createSubscription(),
  discarded: createSubscription(),
  isChild: createSubscription(),
  ticketPrice: null,
  receiveByftFree: null,
};

export default initialState;