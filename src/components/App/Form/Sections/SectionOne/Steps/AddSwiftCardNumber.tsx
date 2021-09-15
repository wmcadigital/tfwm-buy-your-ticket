import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Input from 'components/shared/Input';
import InsetText from 'components/shared/InsetText/InsetText';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const AddSwiftCard = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;

  const currentSwiftcardNumber = useFormDataSubscription('currentSwiftcardNumber');

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentSwiftcardNumber.set(e.target.value);
  };

  const handleContinue = () => {
    if (!currentSwiftcardNumber.save()) return;
    goToNextStep();
  };

  return (
    <QuestionCard
      question="What is the Swift card number?"
      handleContinue={handleContinue}
      showError={!!currentSwiftcardNumber.error}
    >
      <Input
        groupClassName="wmnds-m-b-lg"
        name="swiftCardNumber"
        label="This is the 18-digit number on the front of the card."
        className="wmnds-col-1 wmnds-col-md-2-3"
        onChange={setCurrentValue}
        defaultValue={currentSwiftcardNumber.value}
        error={currentSwiftcardNumber.error}
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
    </QuestionCard>
  );
};

export default AddSwiftCard;
