import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';

// import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const TicketHolderOrPayerContactDetails = ({ stepNavigation, currentSection }: TStepProps) => {
  const { goToNextStep } = stepNavigation;

  return (
    <QuestionCard question="Are you buying the ticket for yourself?" handleContinue={goToNextStep}>
      <p>{currentSection}</p>
    </QuestionCard>
  );
};

export default TicketHolderOrPayerContactDetails;
