import { FullNameStep } from 'components/sharedSteps';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import useNavigationLogic from 'customHooks/useNavigationLogic/useNavigationLogic';

const PayerName = () => {
  const applicationForMe = useFormDataSubscription('applicationForMe');

  const question = applicationForMe.currentValue
    ? 'What is your name?'
    : "What is the payer's name?";

  const dataNamePrefix = applicationForMe.currentValue ? 'ticketHolder' : 'payer';

  const prevStep = applicationForMe.currentValue
    ? 'CheckIfUserIsTheTicketHolder'
    : 'TicketHolderPhoto';

  const { goToNextStep } = useNavigationLogic(prevStep, 'PayerOrTicketHolderBirthDate');

  return (
    <FullNameStep
      handleNavigation={goToNextStep}
      dataNamePrefix={dataNamePrefix}
      question={question}
    />
  );
};

export default PayerName;
