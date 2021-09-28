import Question from 'components/shared/Question/Question';
import Input from 'components/shared/Input';
import InsetText from 'components/shared/InsetText/InsetText';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';
import { useValidateSwiftCardNumber } from 'customHooks/axiosRequests';

const AddSwiftCard = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;

  const currentSwiftcardNumber = useFormDataSubscription('currentSwiftcardNumber');
  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentSwiftcardNumber.set(e.target.value);
  };

  const validateSwiftCardNumber = useValidateSwiftCardNumber(currentSwiftcardNumber.value);

  const handleContinue = async () => {
    if (!currentSwiftcardNumber.save()) return;
    const isValidSwiftCardNumber = await validateSwiftCardNumber.sendRequest();
    if (!isValidSwiftCardNumber) return;
    goToNextStep();
  };

  return (
    <Question
      question="What is the Swift card number?"
      handleContinue={handleContinue}
      showError={currentSwiftcardNumber.hasError || validateSwiftCardNumber.hasError}
      isLoading={validateSwiftCardNumber.isLoading}
    >
      <Input
        groupClassName="wmnds-m-b-lg"
        name="swiftCardNumber"
        label="This is the 18-digit number on the front of the card."
        className="wmnds-col-1 wmnds-col-md-2-3"
        onChange={setCurrentValue}
        defaultValue={currentSwiftcardNumber.value}
        error={
          currentSwiftcardNumber.error ||
          (validateSwiftCardNumber.hasError
            ? { message: 'Please enter a valid Swift Card number' }
            : null)
        }
      />
      <InsetText
        classes="wmnds-m-b-lg"
        content={
          <span>
            You&apos;ll need to{' '}
            <a href="https://www.tfwm.org.uk/get-help/find-a-swift-collector-or-kiosk/">
              collect the new ticket to your Swift card
            </a>{' '}
            before you travel.
          </span>
        }
      />
    </Question>
  );
};

export default AddSwiftCard;
