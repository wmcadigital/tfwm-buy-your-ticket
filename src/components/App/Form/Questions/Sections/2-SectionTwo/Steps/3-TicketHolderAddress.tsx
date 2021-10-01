import { AddressStep } from 'components/sharedSteps';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import useNavigationLogic from 'customHooks/useNavigationLogic/useNavigationLogic';

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
