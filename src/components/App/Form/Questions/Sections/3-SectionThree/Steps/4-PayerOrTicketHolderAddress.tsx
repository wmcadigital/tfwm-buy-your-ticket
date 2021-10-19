import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { AddressStep } from 'components/sharedSteps';

const PayerAddress = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');

  const question = applicationForMe.currentValue
    ? 'What is your address?'
    : "What is the payer's address?";

  const dataNamePrefix = applicationForMe.currentValue ? 'ticketHolder' : 'payer';

  const nextStep = applicationForMe.currentValue
    ? 'PayerOrTicketHolderPhoto'
    : 'InstructionsToBank'; // Skip the photo step

  const { goToNextStep } = useNavigationLogic('PayerOrTicketHolderContactDetails', nextStep);

  return (
    <AddressStep
      handleNavigation={goToNextStep}
      dataNamePrefix={dataNamePrefix}
      question={question}
    />
  );
};

export default PayerAddress;
