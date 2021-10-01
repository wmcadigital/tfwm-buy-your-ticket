export const formPath = [
  [
    'TicketStartDate',
    'AddToExistingSwiftCard',
    'AddSwiftCardNumber',
    'CheckIfUserIsTheTicketHolder',
  ],
  ['TicketHolderName', 'TicketHolderBirthDate', 'TicketHolderAddress', 'TicketHolderPhoto'],
  [
    'PayerOrTicketHolderName',
    'PayerOrTicketHolderBirthDate',
    'PayerOrTicketHolderContactDetails',
    'PayerOrTicketHolderAddress',
    'PayerOrTicketHolderPhoto',
  ],
  ['InstructionsToBank', 'HowDidYouFindOutAboutDD'],
] as const;

const flatPath = formPath.flat();
export type TFormStep = typeof flatPath[number];
