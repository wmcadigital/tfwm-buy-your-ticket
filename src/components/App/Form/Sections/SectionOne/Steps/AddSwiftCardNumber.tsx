import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Input from 'components/shared/Input';
import InsetText from 'components/shared/InsetText/InsetText';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const AddSwiftCard = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;

  const currentSwiftcardNumber = useFormDataSubscription('currentSwiftcardNumber');
  const { value } = currentSwiftcardNumber;

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentSwiftcardNumber.set(e.target.value);
  };

  const handleContinue = () => {
    currentSwiftcardNumber.save();
    goToNextStep();
  };

  return (
    <QuestionCard question="What is the Swift card number?" handleContinue={handleContinue}>
      <Input
        name="swiftCardNumber"
        label="This is the 16-digit number on the front of the card."
        className="wmnds-col-1 wmnds-col-md-2-3"
        onChange={setCurrentValue}
        defaultValue={value}
      />
      <InsetText
        classes="wmnds-m-b-lg"
        content={
          <span>
            You will need to <a href="#test">collect your ticket to your Swift card</a> before you
            travel.
          </span>
        }
      />
    </QuestionCard>
  );
};

export default AddSwiftCard;
