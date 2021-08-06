import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Input from 'components/shared/Input';
import WarningText from 'components/shared/WarningText/WarningText';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const TicketHolderOrPayerName = ({ stepNavigation, currentSection }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const applicationForMe = useFormDataSubscription('applicationForMe');
  const ticketHolderFirstName = useFormDataSubscription('ticketHolderFirstName');
  const ticketHolderLastName = useFormDataSubscription('ticketHolderLastName');
  const payerFirstName = useFormDataSubscription('payerFirstName');
  const payerLastName = useFormDataSubscription('payerLastName');

  let question = '';
  let defaultFirstName: string | null = ticketHolderFirstName.value;
  let defaultLastName: string | null = ticketHolderLastName.value;
  let onChangeFirstName = ticketHolderFirstName.set;
  let onChangeLastName = ticketHolderLastName.set;

  if (currentSection === 2) {
    question = 'Who will be using this ticket?';
  } else if (!applicationForMe.value) {
    question = "What is the payer's name?";
    defaultFirstName = payerFirstName.value;
    onChangeFirstName = payerFirstName.set;
    defaultLastName = payerLastName.value;
    onChangeLastName = payerLastName.set;
  } else {
    question = 'What it is your name?';
  }

  return (
    <>
      <QuestionCard question={question} handleContinue={goToNextStep}>
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
          defaultValue={defaultFirstName}
          type="text"
          className="wmnds-col-1 wmnds-col-md-2-3"
          onChange={() => onChangeFirstName}
        />
        <Input
          name="lastName"
          inputmode="text"
          label="Last Name"
          defaultValue={defaultLastName}
          type="text"
          className="wmnds-col-1 wmnds-col-md-2-3"
          onChange={() => onChangeLastName}
        />
      </QuestionCard>
    </>
  );
};

export default TicketHolderOrPayerName;
