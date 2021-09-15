import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Radios from 'components/shared/Radios/Radios';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const CheckIfUserIsTheTicketHolder = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep, skipToSection } = stepNavigation;

  const applicationForMe = useFormDataSubscription('applicationForMe');
  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    applicationForMe.set(e.target.value.toLowerCase() === 'true');
  };

  const handleContinue = () => {
    if (!applicationForMe.save()) return;
    if (applicationForMe.value === false) goToNextStep();
    else skipToSection(3);
  };

  return (
    <QuestionCard
      question="Are you buying the ticket for yourself?"
      handleContinue={handleContinue}
      showError={!!applicationForMe.error}
    >
      <Radios
        name="isApplicationForMe"
        onChange={setCurrentValue}
        currentValue={applicationForMe.value}
        error={applicationForMe.error}
        radios={[
          { text: 'Yes', html: null, value: true, info: null },
          { text: 'No', html: null, value: false, info: null },
        ]}
      />
    </QuestionCard>
  );
};

export default CheckIfUserIsTheTicketHolder;
