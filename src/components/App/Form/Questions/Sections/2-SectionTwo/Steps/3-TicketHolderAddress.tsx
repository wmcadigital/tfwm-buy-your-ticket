import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { AddressStep } from 'components/sharedSteps';

const TicketHolderAddress = () => {
  const { goToNextStep } = useNavigationLogic('TicketHolderBirthDate', 'TicketHolderPhoto');
  const ticketHolderFirstName = useFormDataSubscription('ticketHolderFirstName');

  return (
    <AddressStep
      handleNavigation={goToNextStep}
      dataNamePrefix="ticketHolder"
      question={`What is ${ticketHolderFirstName.currentValue}'s address?`}
    />
  );
};

export default TicketHolderAddress;
