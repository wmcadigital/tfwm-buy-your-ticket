import Question from 'components/shared/Question/Question';
import Radios from 'components/shared/Radios/Radios';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const AddToExistingSwiftCard = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep, skipToStep } = stepNavigation;
  const addProductToExistingCard = useFormDataSubscription('addProductToExistingCard');
  // console.log(addProductToExistingCard);

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    addProductToExistingCard.set(e.target.value.toLowerCase() === 'true');
  };

  const handleContinue = () => {
    if (!addProductToExistingCard.save()) return;
    if (addProductToExistingCard.value === true) goToNextStep();
    else skipToStep(4);
  };

  return (
    <Question
      question="Would you like to add the ticket to an existing Swift card?"
      handleContinue={handleContinue}
      showError={!!addProductToExistingCard.error}
    >
      <Radios
        name="existingSwiftCard"
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
        error={addProductToExistingCard.error}
        currentValue={addProductToExistingCard.value}
        onChange={setCurrentValue}
        radios={[
          { text: 'Yes', html: null, value: true, info: null },
          { text: 'No, I need a new card', html: null, value: false, info: null },
        ]}
        required
      />
    </Question>
  );
};

export default AddToExistingSwiftCard;
