import { TSubscription } from 'types/subscription';
import { Nullable } from 'types/helpers';

// fields that are directly editeed by user need to be Subscription<DATA_TYPE>
// fields that are set via code need to be Nullable<DATA_TYPE>
export type TFormDataState = {
  sessionNo: Nullable<number>;
  id: Nullable<string>;
  onlineApplicationNo: Nullable<number>;
  submissionDate: Nullable<string>;
  onlineSalesTransactionId: Nullable<number>;
  createdDateTime: Nullable<string>;
  applicationForMe: Nullable<boolean>;
  startDate: TSubscription<string>;
  ticketId: Nullable<number>;
  ticketCode: Nullable<number>;
  addOn: Nullable<string>;
  promotionalCode: Nullable<string>;
  previousCustomer: TSubscription<number>;
  previousCustomerReferenceNumber: TSubscription<number>;
  currentSwiftcard: TSubscription<boolean>;
  currentSwiftcardNumber: TSubscription<string>;
  addProductToExistingCard: TSubscription<boolean>;
  isApprentice: TSubscription<boolean>;
  schoolName: TSubscription<string>;
  schoolPostcode: TSubscription<string>;
  employerName: TSubscription<string>;
  employerPostcode: TSubscription<string>;
  filename: TSubscription<string>;
  payerTitle: TSubscription<string>;
  payerFirstName: TSubscription<string>;
  payerLastName: TSubscription<string>;
  payerDateOfBirth: TSubscription<string>;
  payerHomePhoneNumber: TSubscription<string>;
  payerWorkPhoneNumber: TSubscription<string>;
  payerMobilePhoneNumber: TSubscription<string>;
  payerEmailAddress: TSubscription<string>;
  currentTimeAtAddressYears: TSubscription<number>;
  currentTimeAtAddressMonths: TSubscription<number>;
  previousTimeAtAddressYears: TSubscription<number>;
  previousTimeAtAddressMonths: TSubscription<number>;
  payerCurrentPostcode: TSubscription<string>;
  payerCurrentAddressLine1: TSubscription<string>;
  payerCurrentAddressLine2: TSubscription<string>;
  payerCurrentAddressLine3: TSubscription<string>;
  payerCurrentAddressLine4: TSubscription<string>;
  payerCurrentTown: TSubscription<string>;
  payerPreviousPostcode: TSubscription<string>;
  payerPreviousAddressLine1: TSubscription<string>;
  payerPreviousAddressLine2: TSubscription<string>;
  payerPreviousAddressLine3: TSubscription<string>;
  payerPreviousAddressLine4: TSubscription<string>;
  payerPreviousTown: TSubscription<string>;
  ticketHolderTitle: TSubscription<string>;
  ticketHolderFirstName: TSubscription<string>;
  ticketHolderLastName: TSubscription<string>;
  ticketHolderDateOfBirth: TSubscription<string>;
  ticketHolderHomePhoneNumber: TSubscription<string>;
  ticketHolderWorkPhoneNumber: TSubscription<string>;
  ticketHolderMobilePhoneNumber: TSubscription<string>;
  ticketHolderEmailAddress: TSubscription<string>;
  wouldLikeNetworkClubNews: TSubscription<boolean>;
  howDidYouHearAboutCentroDirectDebit: TSubscription<string>;
  ticketHolderCurrentPostcode: TSubscription<string>;
  ticketHolderCurrentAddressLine1: TSubscription<string>;
  ticketHolderCurrentAddressLine2: TSubscription<string>;
  ticketHolderCurrentAddressLine3: TSubscription<string>;
  ticketHolderCurrentAddressLine4: TSubscription<string>;
  ticketHolderCurrentTown: TSubscription<string>;
  ticketHolderPreviousPostcode: TSubscription<string>;
  ticketHolderPreviousAddressLine1: TSubscription<string>;
  ticketHolderPreviousAddressLine2: TSubscription<string>;
  ticketHolderPreviousAddressLine3: TSubscription<string>;
  ticketHolderPreviousAddressLine4: TSubscription<string>;
  ticketHolderPreviousTown: TSubscription<string>;
  accountName: TSubscription<string>;
  accountNumber: TSubscription<string>;
  sortCode: TSubscription<string>;
  relationshipToTicketHolder: TSubscription<string>;
  has16to18Card: TSubscription<boolean>;
  cardNumber16to18: TSubscription<string>;
  imported: TSubscription<boolean>;
  discarded: TSubscription<boolean>;
  isChild: TSubscription<boolean>;
  ticketPrice: Nullable<number>;
  receiveByftFree: Nullable<boolean>;
};

export type TFormDataStateItem = keyof TFormDataState;

export type TFormDataStateAction =
  | {
      type: 'UPDATE_FORM_DATA';
      payload: {
        name: TFormDataStateItem;
        value: string | boolean | number;
      };
    }
  | {
      type: 'UPDATE_SUBSCRIBED_FORM_DATA';
      payload: Pick<TSubscription<string | boolean | number>, 'value'> & {
        name: TFormDataStateItem;
      };
    }
  | {
      type: 'SUBSCRIBE_TO_FORM_DATA';
      payload: Array<
        Pick<TSubscription<string | boolean | number>, 'section' | 'step'> & {
          name: TFormDataStateItem;
        }
      >;
    };

export type TFormDataStateReducer = (
  state: TFormDataState,
  action: TFormDataStateAction,
) => TFormDataState;

export type TFormDataContext = [TFormDataState, React.Dispatch<TFormDataStateAction>];

export type TFormDataContextProviderProps = {
  children?: React.ReactNode;
};
