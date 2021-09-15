import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import DateInput from 'components/shared/Date/DateInput';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TSharedStepProps } from '../types';

const BirthDateStep = ({ handleNavigation, question, dataNamePrefix }: TSharedStepProps) => {
  const birthDate = useFormDataSubscription(`${dataNamePrefix}DateOfBirth`);

  const handleContinue = () => {
    if (!birthDate.save()) return;
    handleNavigation();
  };

  return (
    <QuestionCard
      question={question}
      handleContinue={handleContinue}
      showError={birthDate.hasError}
    >
      <DateInput
        hint={
          <>
            <p>We&apos;ll use this as a security question if we are contacted for help.</p>
            <p>For example, 3 7 1985</p>
          </>
        }
        name="DateOfBirth"
        defaultDate={birthDate.value}
        onChange={birthDate.set}
        hasError={birthDate.hasError}
      />
    </QuestionCard>
  );
};

export default BirthDateStep;
