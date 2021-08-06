import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Input from 'components/shared/Input';
import WarningText from 'components/shared/WarningText/WarningText';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { useFormDataContext } from 'state/formDataState/context';
import { TStepProps } from 'types/step';

const TicketHolderOrPayerName = ({ stepNavigation, currentSection }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const [formDataState] = useFormDataContext();
  const { applicationForMe } = formDataState;

  // We only want to save this step's answers into payer variables
  // when we are inside section 3 AND when aplication is for someone else,
  // otherwise we will be saving them as ticket holder information
  const ticketHolderOrPayerFirstNameVar =
    currentSection === 3 && !applicationForMe.value ? 'payerFirstName' : 'ticketHolderFirstName';
  const ticketHolderOrPayerLastNameVar =
    currentSection === 3 && !applicationForMe.value ? 'payerLastName' : 'ticketHolderLastName';

  const firstName = useFormDataSubscription(ticketHolderOrPayerFirstNameVar);
  const lastName = useFormDataSubscription(ticketHolderOrPayerLastNameVar);

  let question = '';
  if (currentSection === 2) {
    // ticket for someone else and we are collecting ticket holder information (section 2)
    question = 'Who will be using this ticket?';
  } else if (!applicationForMe.value) {
    // ticket for someone else and we are collecting payer information (section 3)
    question = "What is the payer's name?";
  } else {
    // ticket is for the user and we are collecting his information (ticket holder) (section 3 only)
    question = 'What it is your name?';
  }

  const handleContinue = () => {
    firstName.save();
    lastName.save();
    return goToNextStep();
  };
  return (
    <>
      <QuestionCard question={question} handleContinue={handleContinue}>
        {currentSection === 2 && (
          <WarningText
            type="info"
            message="If you're getting this ticket for someone else, use their details for this section"
            className="wmnds-m-b-lg"
          />
        )}
        <Input
          name="firstName"
          inputmode="text"
          label="First Name"
          defaultValue={firstName.value}
          type="text"
          className="wmnds-col-1 wmnds-col-md-2-3"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => firstName.set(e.target.value)}
        />
        <Input
          name="lastName"
          inputmode="text"
          label="Last Name"
          defaultValue={lastName.value}
          type="text"
          className="wmnds-col-1 wmnds-col-md-2-3"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => lastName.set(e.target.value)}
        />
      </QuestionCard>
    </>
  );
};

export default TicketHolderOrPayerName;
