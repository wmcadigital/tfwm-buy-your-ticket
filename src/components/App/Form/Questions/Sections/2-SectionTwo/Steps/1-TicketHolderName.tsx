import { useNavigationLogic } from 'customHooks';
import { FullNameStep } from 'components/sharedSteps';

const TicketHolderName = () => {
  const { goToNextStep } = useNavigationLogic(
    'CheckIfUserIsTheTicketHolder',
    'TicketHolderBirthDate',
  );

  return (
    <FullNameStep
      handleNavigation={goToNextStep}
      dataNamePrefix="ticketHolder"
      question="Who will be using this ticket?"
      warningText="If you're getting this ticket for someone else, use their details for this section"
    />
  );
};

export default TicketHolderName;
