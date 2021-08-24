import { Nullable } from 'types/helpers';

// fields that are directly edited by user need to be Subscription<DATA_TYPE>
// fields that are set via code need to be Nullable<DATA_TYPE>
export type TFormDataState = {
  sessionNo: Nullable<number>;
  id: Nullable<string>;
  onlineApplicationNo: Nullable<number>;
  submissionDate: Nullable<string>;
  onlineSalesTransactionId: Nullable<number>;
  createdDateTime: Nullable<string>;
  applicationForMe: Nullable<boolean>;
  startDate: Nullable<Date>;
  ticketId: Nullable<number>;
  ticketCode: Nullable<number>;
  addOn: Nullable<string>;
  promotionalCode: Nullable<string>;
  previousCustomer: Nullable<number>;
  previousCustomerReferenceNumber: Nullable<number>;
  currentSwiftcard: Nullable<boolean>;
  currentSwiftcardNumber: Nullable<string>;
  addProductToExistingCard: Nullable<boolean>;
  isApprentice: Nullable<boolean>;
  schoolName: Nullable<string>;
  schoolPostcode: Nullable<string>;
  employerName: Nullable<string>;
  employerPostcode: Nullable<string>;
  filename: Nullable<string>;
  payerTitle: Nullable<string>;
  payerFirstName: Nullable<string>;
  payerLastName: Nullable<string>;
  payerDateOfBirth: Nullable<Date>;
  payerHomePhoneNumber: Nullable<string>;
  payerWorkPhoneNumber: Nullable<string>;
  payerMobilePhoneNumber: Nullable<string>;
  payerEmailAddress: Nullable<string>;
  currentTimeAtAddressYears: Nullable<number>;
  currentTimeAtAddressMonths: Nullable<number>;
  previousTimeAtAddressYears: Nullable<number>;
  previousTimeAtAddressMonths: Nullable<number>;
  payerCurrentPostcode: Nullable<string>;
  payerCurrentAddressLine1: Nullable<string>;
  payerCurrentAddressLine2: Nullable<string>;
  payerCurrentAddressLine3: Nullable<string>;
  payerCurrentAddressLine4: Nullable<string>;
  payerCurrentTown: Nullable<string>;
  payerPreviousPostcode: Nullable<string>;
  payerPreviousAddressLine1: Nullable<string>;
  payerPreviousAddressLine2: Nullable<string>;
  payerPreviousAddressLine3: Nullable<string>;
  payerPreviousAddressLine4: Nullable<string>;
  payerPreviousTown: Nullable<string>;
  ticketHolderTitle: Nullable<string>;
  ticketHolderFirstName: Nullable<string>;
  ticketHolderLastName: Nullable<string>;
  ticketHolderDateOfBirth: Nullable<Date>;
  ticketHolderHomePhoneNumber: Nullable<string>;
  ticketHolderWorkPhoneNumber: Nullable<string>;
  ticketHolderMobilePhoneNumber: Nullable<string>;
  ticketHolderEmailAddress: Nullable<string>;
  wouldLikeNetworkClubNews: Nullable<boolean>;
  howDidYouHearAboutCentroDirectDebit: Nullable<string>;
  ticketHolderCurrentPostcode: Nullable<string>;
  ticketHolderCurrentAddressLine1: Nullable<string>;
  ticketHolderCurrentAddressLine2: Nullable<string>;
  ticketHolderCurrentAddressLine3: Nullable<string>;
  ticketHolderCurrentAddressLine4: Nullable<string>;
  ticketHolderCurrentTown: Nullable<string>;
  ticketHolderPreviousPostcode: Nullable<string>;
  ticketHolderPreviousAddressLine1: Nullable<string>;
  ticketHolderPreviousAddressLine2: Nullable<string>;
  ticketHolderPreviousAddressLine3: Nullable<string>;
  ticketHolderPreviousAddressLine4: Nullable<string>;
  ticketHolderPreviousTown: Nullable<string>;
  accountName: Nullable<string>;
  accountNumber: Nullable<string>;
  sortCode: Nullable<string>;
  relationshipToTicketHolder: Nullable<string>;
  has16to18Card: Nullable<boolean>;
  cardNumber16to18: Nullable<string>;
  imported: Nullable<boolean>;
  discarded: Nullable<boolean>;
  isChild: Nullable<boolean>;
  ticketPrice: Nullable<number>;
  receiveByftFree: Nullable<boolean>;
};

export type TFormDataStateKey = keyof TFormDataState;
export type TFormDataStateValue = string | boolean | number;

export type TFormDataStateAction =
  | {
      type: 'UPDATE_FORM_DATA';
      payload: {
        name: TFormDataStateKey;
        value: TFormDataStateValue;
      };
    }
  | {
      type: 'UPDATE_SUBSCRIBED_FORM_DATA';
      payload: {
        name: TFormDataStateKey;
        value: TFormDataStateValue;
      };
    };

export type TFormDataStateReducer = (
  state: TFormDataState,
  action: TFormDataStateAction,
) => TFormDataState;

export type TFormDataContext = [TFormDataState, React.Dispatch<TFormDataStateAction>];

export type TFormDataContextProviderProps = {
  children?: React.ReactNode;
};
