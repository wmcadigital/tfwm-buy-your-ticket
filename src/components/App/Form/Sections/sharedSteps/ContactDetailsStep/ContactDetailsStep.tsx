import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Input from 'components/shared/Input';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

import { TSharedStepProps } from '../types';

const ContactDetailsStep = ({ handleNavigation, question, dataNamePrefix }: TSharedStepProps) => {
  const emailAddress = useFormDataSubscription(`${dataNamePrefix}EmailAddress`);
  const phoneNumber = useFormDataSubscription(`${dataNamePrefix}MobilePhoneNumber`);

  const handleContinue = () => {
    emailAddress.save();
    phoneNumber.save();
    return handleNavigation();
  };

  return (
    <QuestionCard question={question} handleContinue={handleContinue}>
      <p className="wmnds-m-b-lg">
        We&apos;ll use this to get in touch about the Direct Debit and ticket.
      </p>
      <Input
        groupClassName="wmnds-m-b-lg"
        name="email"
        inputmode="email"
        label={
          <>
            Email address
            <br />
            For example, name@example.com
          </>
        }
        defaultValue={emailAddress.value}
        type="text"
        className="wmnds-col-1 wmnds-col-md-2-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => emailAddress.set(e.target.value)}
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        name="mobilePhone"
        inputmode="tel"
        label={
          <>
            Phone number
            <br />
            For example, 07700900457
          </>
        }
        defaultValue={phoneNumber.value}
        type="text"
        className="wmnds-col-1 wmnds-col-md-2-3"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => phoneNumber.set(e.target.value)}
      />
    </QuestionCard>
  );
};

export default ContactDetailsStep;
