import { useState } from 'react';
import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Radios from 'components/shared/Radios/Radios';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const AddToExistingSwiftCard = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep, skipToStep } = stepNavigation;
  const [errors, setErrors] = useState<{ name: { message: string } }[] | null[]>([]);
  const addProductToExistingCard = useFormDataSubscription('addProductToExistingCard');
  const { value } = addProductToExistingCard;

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    addProductToExistingCard.set(e.target.value.toLowerCase() === 'true');
  };

  const handleContinue = () => {
    if (addProductToExistingCard.value) {
      addProductToExistingCard.save();
      if (value === true) return goToNextStep();
      return skipToStep(4);
    }
    const errorObj = { name: { message: 'This field is mandatory' } };
    setErrors([errorObj]);
    return false;
  };

  return (
    <QuestionCard
      question="Would you like to add the ticket to an existing Swift card?"
      handleContinue={handleContinue}
      showError={errors.length > 0}
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
        error={errors ? errors[0] : null}
        currentValue={value}
        onChange={setCurrentValue}
        radios={[
          { text: 'Yes', html: null, value: 'true', info: null },
          { text: 'No, I need a new card', html: null, value: 'false', info: null },
        ]}
        required
      />
    </QuestionCard>
  );
};

export default AddToExistingSwiftCard;
