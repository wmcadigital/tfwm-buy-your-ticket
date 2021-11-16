import { useFormDataContext } from 'state/formDataState';
import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { Question, Radios } from 'components/shared';

const AddToExistingSwiftCard = () => {
  const [, formDataDispatch] = useFormDataContext();
  const addProductToExistingCard = useFormDataSubscription('addProductToExistingCard');
  const nextStep = addProductToExistingCard.currentValue
    ? 'AddSwiftCardNumber'
    : 'CheckIfUserIsTheTicketHolder';

  const { goToNextStep } = useNavigationLogic('TicketStartDate', nextStep);

  const setCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    addProductToExistingCard.set(e.target.value.toLowerCase() === 'true');
  };

  const handleContinue = () => {
    if (!addProductToExistingCard.validate()) return;
    // If user changes this step we need to delete any saved data
    if (
      addProductToExistingCard.currentValue === false &&
      addProductToExistingCard.savedValue === true
    ) {
      formDataDispatch({ type: 'CLEAR_FORM_DATA', payload: ['currentSwiftcardNumber'] });
    }
    addProductToExistingCard.save();
    goToNextStep();
  };

  return (
    <Question
      question="Would you like to add the ticket to an existing Swift card?"
      handleContinue={handleContinue}
      showError={addProductToExistingCard.hasError}
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
        currentValue={addProductToExistingCard.currentValue}
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
