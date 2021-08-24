import { TStepProps } from 'types/step';
import { FullNameStep } from '../../sharedSteps';

const TicketHolderName = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;

  return (
    <FullNameStep
      handleNavigation={goToNextStep}
      dataNamePrefix="ticketHolder"
      question="Who will be using this ticket?"
      warningText="If yo're getting this ticket for someone else, use their details for this section"
    />
  );
};

export default TicketHolderName;
