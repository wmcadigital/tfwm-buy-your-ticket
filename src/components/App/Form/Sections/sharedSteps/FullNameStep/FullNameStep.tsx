import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Input from 'components/shared/Input';
import WarningText from 'components/shared/WarningText/WarningText';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TFullNameStepProps } from './FullNameStep.types';

const FullNameStep = ({
  handleNavigation,
  question,
  dataNamePrefix,
  warningText,
}: TFullNameStepProps) => {
  const firstName = useFormDataSubscription(`${dataNamePrefix}FirstName`);
  const lastName = useFormDataSubscription(`${dataNamePrefix}LastName`);

  const handleContinue = () => {
    const firstNameValid = firstName.save();
    const lastNameValid = lastName.save();
    if (!firstNameValid || !lastNameValid) return;
    handleNavigation();
  };

  const showError = !!firstName.error && !!lastName.error;

  return (
    <QuestionCard question={question} handleContinue={handleContinue} showError={showError}>
      {warningText && <WarningText type="info" message={warningText} className="wmnds-m-b-lg" />}
      <Input
        groupClassName="wmnds-m-b-lg"
        name="firstName"
        inputmode="text"
        label="First Name"
        defaultValue={firstName.value as string}
        type="text"
        className="wmnds-col-1 wmnds-col-md-2-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => firstName.set(e.target.value)}
        error={firstName.error}
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        name="lastName"
        inputmode="text"
        label="Last Name"
        defaultValue={lastName.value as string}
        type="text"
        className="wmnds-col-1 wmnds-col-md-2-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => lastName.set(e.target.value)}
        error={lastName.error}
      />
    </QuestionCard>
  );
};

export default FullNameStep;
