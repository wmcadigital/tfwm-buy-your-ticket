import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Input from 'components/shared/Input';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { useFormDataContext } from 'state/formDataState/context';

import { TStepProps } from 'types/step';

const TicketHolderOrPayerContactDetails = ({ stepNavigation, currentSection }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const [formDataState] = useFormDataContext();
  const { applicationForMe } = formDataState;

  // We only want to save this step's answers into payer variables
  // when we are inside section 3 AND when aplication is for someone else,
  // otherwise we will be saving them as ticket holder information
  const ticketHolderOrPayerEmailVar =
    currentSection === 3 && !applicationForMe.value
      ? 'payerEmailAddress'
      : 'ticketHolderEmailAddress';
  const ticketHolderOrPayerMobileVar =
    currentSection === 3 && !applicationForMe.value
      ? 'payerMobilePhoneNumber'
      : 'ticketHolderMobilePhoneNumber';

  const email = useFormDataSubscription(ticketHolderOrPayerEmailVar);
  const mobilePhone = useFormDataSubscription(ticketHolderOrPayerMobileVar);

  let question = '';
  if (!applicationForMe.value) {
    // ticket for someone else and we are collecting payer information (section 3)
    question = "What are the payer's contact details?";
  } else {
    // ticket is for the user and we are collecting his information (ticket holder) (section 3 only)
    question = 'What are your contact details?';
  }

  const handleContinue = () => {
    email.save();
    mobilePhone.save();
    return goToNextStep();
  };

  return (
    <QuestionCard question={question} handleContinue={handleContinue}>
      <p className="wmnds-m-b-lg">
        We&apos;ll use this to get in touch about the Direct Debit and ticket.
      </p>
      <Input
        name="email"
        inputmode="email"
        label={
          <>
            Email address
            <br />
            For example, name@example.com
          </>
        }
        defaultValue={email.value}
        type="text"
        className="wmnds-col-1 wmnds-col-md-2-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => email.set(e.target.value)}
      />
      <Input
        name="mobilePhone"
        inputmode="tel"
        label={
          <>
            Phone number
            <br />
            For example, 07700900457
          </>
        }
        defaultValue={mobilePhone.value}
        type="text"
        className="wmnds-col-1 wmnds-col-md-2-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => mobilePhone.set(e.target.value)}
      />
    </QuestionCard>
  );
};

export default TicketHolderOrPayerContactDetails;
