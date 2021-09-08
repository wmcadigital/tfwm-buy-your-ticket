import { TStepProps } from 'types/step';
import { useFormDataContext } from 'state/formDataState/context';
import { ContactDetailsStep } from '../../sharedSteps';

const PayerContactDetails = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const [formDataState] = useFormDataContext();
  const { applicationForMe } = formDataState;

  const question = applicationForMe.value
    ? 'What are your contact details?'
    : "What are the payer's contact details?";

  const dataNamePrefix = applicationForMe.value ? 'ticketHolder' : 'payer';

  return (
    <ContactDetailsStep
      handleNavigation={goToNextStep}
      dataNamePrefix={dataNamePrefix}
      question={question}
    />
  );
};

export default PayerContactDetails;
