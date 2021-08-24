import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import DateInputs from 'components/shared/Date/DateInputs';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TSharedStepProps } from '../types';

const BirthDateStep = ({ handleNavigation, question, dataNamePrefix }: TSharedStepProps) => {
  const birthDate = useFormDataSubscription(`${dataNamePrefix}DateOfBirth`);

  const handleContinue = () => {
    birthDate.save();
    return handleNavigation();
  };

  return (
    <QuestionCard question={question} handleContinue={handleContinue}>
      <DateInputs
        hint={
          <>
            <p>We&apos;ll use this as a security question if we are contacted for help.</p>
            <p>For example, 3 7 1985</p>
          </>
        }
        name="DateOfBirth"
        defaultDate={birthDate.value}
        // onChange={onChangeDate}
      />
    </QuestionCard>
  );
};

export default BirthDateStep;
