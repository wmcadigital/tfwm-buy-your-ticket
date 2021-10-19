import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { ContactDetailsStep } from 'components/sharedSteps';

const PayerContactDetails = () => {
  const { goToNextStep } = useNavigationLogic(
    'PayerOrTicketHolderBirthDate',
    'PayerOrTicketHolderAddress',
  );

  const applicationForMe = useFormDataSubscription('applicationForMe');

  const question = applicationForMe.currentValue
    ? 'What are your contact details?'
    : "What are the payer's contact details?";

  const dataNamePrefix = applicationForMe.currentValue ? 'ticketHolder' : 'payer';

  return (
    <ContactDetailsStep
      handleNavigation={goToNextStep}
      dataNamePrefix={dataNamePrefix}
      question={question}
    />
  );
};

export default PayerContactDetails;
