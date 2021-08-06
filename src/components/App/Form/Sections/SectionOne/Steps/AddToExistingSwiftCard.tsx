import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Radios from 'components/shared/Radios/Radios';
// import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';
// import useFormDataSubscription from 'customHooks/useFormDataSubscription';

const AddToExistingSwiftCard = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  // const addToExistingSwiftCard = useFormDataSubscription('addProductToExistingCard');

  const handleContinue = () => {
    goToNextStep();
    /* addToExistingSwiftCard.save();
    // if answer is 'yes'
    if (addToExistingSwiftCard.value) {
      goToNextStep();
    }
    // if answer is 'no'
    else if (addToExistingSwiftCard.value === false) {
      skipToStep(3);
    } */
  };

  return (
    <QuestionCard
      question="Would you like to add the ticket to an existing Swift card?"
      handleContinue={handleContinue}
    >
      <Radios
        name="existingSwiftCard"
        // defaultValue={addToExistingSwiftCard.value}
        // onChange={addToExistingSwiftCard.set}
        hint={
          <>
            <p>Your Swift card needs to:</p>
            <ul>
              <li>have a photo on</li>
              <li>
                begin with <strong>633597 0107</strong>
              </li>
            </ul>
          </>
        }
        error={null}
        radios={[
          { text: 'Yes', html: null, value: 'true', info: null },
          { text: 'No, I need a new card', html: null, value: 'false', info: null },
        ]}
      />
    </QuestionCard>
  );
};

export default AddToExistingSwiftCard;
