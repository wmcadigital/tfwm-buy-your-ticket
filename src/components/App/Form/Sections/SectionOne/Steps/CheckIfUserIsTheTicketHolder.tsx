import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Radios from 'components/shared/Radios/Radios';

// import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const CheckIfUserIsTheTicketHolder = ({ stepNavigation }: TStepProps) => {
  const { goToNextSection } = stepNavigation;
  // const applicationForMe = useFormDataSubscription('applicationForMe');

  // applicationForMe.set(false);
  // applicationForMe.save();

  return (
    <QuestionCard
      question="Are you buying the ticket for yourself?"
      handleContinue={goToNextSection}
    >
      <Radios
        name=""
        error={null}
        radios={[
          { text: 'Yes', html: null, value: 'true', info: null },
          { text: 'No', html: null, value: 'false', info: null },
        ]}
      />
    </QuestionCard>
  );
};

export default CheckIfUserIsTheTicketHolder;
