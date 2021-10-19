import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { BirthDateStep } from 'components/sharedSteps';

const PayerBirthDate = () => {
  const { goToNextStep } = useNavigationLogic(
    'PayerOrTicketHolderName',
    'PayerOrTicketHolderContactDetails',
  );

  const applicationForMe = useFormDataSubscription('applicationForMe');

  const question = applicationForMe.currentValue
    ? 'What is your date of birth?'
    : "What is the payer's date of birth?";

  const dataNamePrefix = applicationForMe.currentValue ? 'ticketHolder' : 'payer';

  return (
    <BirthDateStep
      handleNavigation={goToNextStep}
      dataNamePrefix={dataNamePrefix}
      question={question}
    />
  );
};

export default PayerBirthDate;
