import { TStepProps } from 'types/step';
import { useFormDataContext } from 'state/formDataState/context';
import { BirthDateStep } from '../../sharedSteps';

const PayerBirthDate = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const [formDataState] = useFormDataContext();
  const { applicationForMe } = formDataState;

  const question = applicationForMe.value
    ? 'What is your date of birth?'
    : "What is the payer's date of birth?";

  const dataNamePrefix = applicationForMe.value ? 'ticketHolder' : 'payer';

  return (
    <BirthDateStep
      handleNavigation={goToNextStep}
      dataNamePrefix={dataNamePrefix}
      question={question}
    />
  );
};

export default PayerBirthDate;
