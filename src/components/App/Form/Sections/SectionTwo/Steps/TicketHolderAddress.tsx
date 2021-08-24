import { TStepProps } from 'types/step';
import { useFormDataContext } from 'state/formDataState/context';
import { AddressStep } from '../../sharedSteps';

const TicketHolderAddress = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const [formDataState] = useFormDataContext();
  const { ticketHolderFirstName } = formDataState;

  return (
    <AddressStep
      handleNavigation={goToNextStep}
      dataNamePrefix="ticketHolder"
      question={`What is ${ticketHolderFirstName}'s address?`}
    />
  );
};

export default TicketHolderAddress;
