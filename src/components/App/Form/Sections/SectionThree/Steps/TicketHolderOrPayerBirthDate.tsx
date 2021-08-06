import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import DateInputs from 'components/shared/Date/DateInputs';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { useFormDataContext } from 'state/formDataState/context';
import { TStepProps } from 'types/step';

const TicketHolderOrPayerBirthDate = ({ stepNavigation, currentSection }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const [formDataState] = useFormDataContext();
  const { ticketHolderFirstName, applicationForMe } = formDataState;

  // We only want to save this step's answers into payer variables
  // when we are inside section 3 AND when aplication is for someone else,
  // otherwise we will be saving them as ticket holder information
  const ticketHolderOrPayerBirthDateVar =
    currentSection === 3 && !applicationForMe.value
      ? 'payerDateOfBirth'
      : 'ticketHolderDateOfBirth';

  const birthDate = useFormDataSubscription(ticketHolderOrPayerBirthDateVar);

  let question = '';
  if (currentSection === 2) {
    // ticket for someone else and we are collecting ticket holder information (section 2)
    question = `What is ${ticketHolderFirstName.value}’s date of birth?`;
  } else if (!applicationForMe.value) {
    // ticket for someone else and we are collecting payer information (section 3)
    question = "What is the payer's date of birth?";
  } else {
    // ticket is for the user and we are collecting his information (ticket holder) (section 3 only)
    question = 'What is your date of birth?';
  }

  const handleContinue = () => {
    birthDate.save();
    return goToNextStep();
  };

  return (
    <QuestionCard question={question} handleContinue={handleContinue}>
      <DateInputs
        hint={
          <>
            <p>We&apos;ll use this as a security question if we are contacted for help.</p>
            <p>For example, 3 7 1985</p>
          </>
        }
        name="DateOfBirth"
        defaultDate={birthDate.value}
        // onChange={onChangeDate}
      />
    </QuestionCard>
  );
};

export default TicketHolderOrPayerBirthDate;
