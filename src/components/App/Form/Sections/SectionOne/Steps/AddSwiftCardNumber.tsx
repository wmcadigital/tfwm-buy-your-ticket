import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Input from 'components/shared/Input';
import InsetText from 'components/shared/InsetText/InsetText';
// import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const AddSwiftCard = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  // currentSwiftcardNumber

  return (
    <QuestionCard question="What is the Swift card number?" handleContinue={goToNextStep}>
      <Input
        name="swiftCardNumber"
        label="This is the 16-digit number on the front of the card."
        className="wmnds-col-1 wmnds-col-md-2-3"
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
