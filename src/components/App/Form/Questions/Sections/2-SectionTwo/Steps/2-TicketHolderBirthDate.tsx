import useNavigationLogic from 'customHooks/useNavigationLogic/useNavigationLogic';
import { BirthDateStep } from 'components/sharedSteps';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

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
