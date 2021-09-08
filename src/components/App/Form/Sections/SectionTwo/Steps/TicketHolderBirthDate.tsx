import { TStepProps } from 'types/step';
import { useFormDataContext } from 'state/formDataState/context';
import { BirthDateStep } from '../../sharedSteps';

const TicketHolderBirthDate = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const [formDataState] = useFormDataContext();
  const { ticketHolderFirstName } = formDataState;

  return (
    <BirthDateStep
      handleNavigation={goToNextStep}
      dataNamePrefix="ticketHolder"
      question={`What is ${ticketHolderFirstName.value}'s date of birth?`}
    />
  );
};

export default TicketHolderBirthDate;
