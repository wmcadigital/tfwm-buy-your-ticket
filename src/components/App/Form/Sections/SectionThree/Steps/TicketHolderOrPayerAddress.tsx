import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Input from 'components/shared/Input';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const TicketHolderOrPayerAddress = ({ stepNavigation, currentSection }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const ticketHolderFirstName = useFormDataSubscription('ticketHolderFirstName');
  const ticketHolderLastName = useFormDataSubscription('ticketHolderLastName');
  const payerFirstName = useFormDataSubscription('payerFirstName');
  const payerLastName = useFormDataSubscription('payerLastName');

  let question = '';
  let defaultFirstName: string | null = ticketHolderFirstName.value;
  let defaultLastName: string | null = ticketHolderLastName.value;

  if (currentSection === 2) {
    question = 'Who will be using this ticket?';
  } else if (!applicationForMe.value) {
    question = "What is the payer's name?";
    defaultFirstName = payerFirstName.value;
    defaultLastName = payerLastName.value;
  } else {
    question = 'What it is your name?';
  }

  return (
    <>
      <QuestionCard question={question} handleContinue={goToNextStep}>
        <Input
          name="firstName"
          inputmode="text"
          label="First Name"
          defaultValue={defaultFirstName}
          type="text"
        />
        <Input
          name="lastName"
          inputmode="text"
          label="Last Name"
          defaultValue={defaultLastName}
          type="text"
        />
      </QuestionCard>
    </>
  );
};

export default TicketHolderOrPayerAddress;
