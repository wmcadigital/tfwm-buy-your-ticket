export const formPath = [
  [
    'OutOfCounty',
    'TicketStartDate',
    'AddToExistingSwiftCard',
    'AddSwiftCardNumber',
    'CheckIfUserIsTheTicketHolder',
  ],
  [
    'TicketHolderName',
    'TicketHolderBirthDate',
    'TicketHolderAddress',
    'TicketHolderPhoto',
    'TicketHolderStudentProof',
    'TicketHolderApprentice',
  ],
  [
    'PayerOrTicketHolderName',
    'PayerOrTicketHolderBirthDate',
    'PayerOrTicketHolderContactDetails',
    'PayerOrTicketHolderAddress',
    'PayerOrTicketHolderPhoto',
    'PayerOrTicketHolderStudentProof',
    'PayerOrTicketHolderApprentice',
  ],
  ['InstructionsToBank', 'HowDidYouFindOutAboutDD'],
] as const;
export const formPathFlat = formPath.flat();
export type TFormStep = typeof formPathFlat[number];
