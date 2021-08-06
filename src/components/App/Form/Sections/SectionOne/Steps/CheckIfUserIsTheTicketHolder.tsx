import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Radios from 'components/shared/Radios/Radios';
import { convertYesNoToBoolean, convertBooleanToYesNo } from 'helpers/yesNoBoolean';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const CheckIfUserIsTheTicketHolder = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep, skipToSection } = stepNavigation;

  const applicationForMe = useFormDataSubscription('applicationForMe');
  const { value } = applicationForMe;

  const currentValue = value === null ? null : convertBooleanToYesNo(value);
  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    applicationForMe.set(convertYesNoToBoolean(e.target.value as 'yes' | 'no'));
  };

  const handleContinue = () => {
    applicationForMe.save();
    if (!value) return goToNextStep();
    return skipToSection(3);
  };

  return (
    <QuestionCard
      question="Are you buying the ticket for yourself?"
      handleContinue={handleContinue}
    >
      <Radios
        name="isApplicationForMe"
        onChange={setCurrentValue}
        currentValue={currentValue}
        error={null}
        radios={[
          { text: 'Yes', html: null, value: 'yes', info: null },
          { text: 'No', html: null, value: 'no', info: null },
        ]}
      />
    </QuestionCard>
  );
};

export default CheckIfUserIsTheTicketHolder;
