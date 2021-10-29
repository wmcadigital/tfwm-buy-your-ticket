import { useFormDataSubscription } from 'customHooks';
import { Question, Radios } from 'components/shared';
import { TProps } from './StudentOrApprenticeStep.types';

import EmployerStep from './EmployerStep/EmployerStep';
import SchoolOrCollegeStep from './SchoolCollegeStep/SchoolOrCollegeStep';

const StudentOrApprenticeStep = ({
  question,
  handleNavigation,
  employerQuestion,
  schoolOrCollegeQuestion,
}: TProps) => {
  const isApprentice = useFormDataSubscription('isApprentice');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === 'true') return isApprentice.set(true);
    if (value === 'false') return isApprentice.set(false);
    isApprentice.set(null);
  };

  const handleContinue = () => {
    isApprentice.save();
  };

  return (
    <Question question={question} handleContinue={handleContinue} showError={isApprentice.hasError}>
      {!isApprentice.hasCurrentValue && (
        <Radios
          name="studentOrApprentice"
          error={isApprentice.error}
          currentValue={isApprentice.currentValue}
          radios={[
            {
              text: 'Student',
              info: '',
              html: '',
              value: false,
            },
            {
              text: 'Apprentice',
              info: '',
              html: '',
              value: true,
            },
          ]}
          onChange={handleChange}
        />
      )}
      {/* Employer */}
      {isApprentice.currentValue === true && (
        <EmployerStep question={employerQuestion} handleNavigation={handleNavigation} />
      )}
      {/* School or college */}
      {isApprentice.currentValue === false && (
        <SchoolOrCollegeStep
          question={schoolOrCollegeQuestion}
          handleNavigation={handleNavigation}
        />
      )}
    </Question>
  );
};

export default StudentOrApprenticeStep;
