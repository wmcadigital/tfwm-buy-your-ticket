import { TStepProps } from 'types/step';
import { useFormDataContext } from 'state/formDataState/context';
import { AddressStep } from '../../sharedSteps';

const PayerAddress = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep, skipToSection } = stepNavigation;
  const [formDataState] = useFormDataContext();
  const { applicationForMe } = formDataState;

  const question = applicationForMe.value
    ? 'What is your address?'
    : "What is the payer's address?";
  const dataNamePrefix = applicationForMe.value ? 'ticketHolder' : 'payer';
  const handleNavigation = applicationForMe.value ? goToNextStep : () => skipToSection(4); // Skip the photo step

  return (
    <AddressStep
      handleNavigation={handleNavigation}
      dataNamePrefix={dataNamePrefix}
      question={question}
    />
  );
};

export default PayerAddress;
