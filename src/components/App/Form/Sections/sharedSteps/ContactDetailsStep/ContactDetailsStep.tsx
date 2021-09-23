import Question from 'components/shared/Question/Question';
import Input from 'components/shared/Input';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

import { TSharedStepProps } from '../types';

const ContactDetailsStep = ({ handleNavigation, question, dataNamePrefix }: TSharedStepProps) => {
  const emailAddress = useFormDataSubscription(`${dataNamePrefix}EmailAddress`, [
    { rule: 'EMAIL' },
  ]);

  const phoneNumber = useFormDataSubscription(`${dataNamePrefix}MobilePhoneNumber`, [
    { rule: 'PHONE_NUMBER' },
  ]);

  const handleContinue = () => {
    const isEmailValid = emailAddress.save();
    const isPhoneNumberValid = phoneNumber.save();
    if (!isEmailValid || !isPhoneNumberValid) return;
    handleNavigation();
  };

  return (
    <Question
      question={question}
      handleContinue={handleContinue}
      showError={emailAddress.hasError || phoneNumber.hasError}
    >
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
        error={emailAddress.error}
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
        error={phoneNumber.error}
      />
    </Question>
  );
};

export default ContactDetailsStep;
