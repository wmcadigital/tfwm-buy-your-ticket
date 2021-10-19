import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { BirthDateStep } from 'components/sharedSteps';

const TicketHolderBirthDate = () => {
  const { goToNextStep } = useNavigationLogic('TicketHolderName', 'TicketHolderAddress');
  const ticketHolderFirstName = useFormDataSubscription('ticketHolderFirstName');

  return (
    <BirthDateStep
      handleNavigation={goToNextStep}
      dataNamePrefix="ticketHolder"
      question={`What is ${ticketHolderFirstName.currentValue}'s date of birth?`}
    />
  );
};

export default TicketHolderBirthDate;
