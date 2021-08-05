import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Radios from 'components/shared/Radios/Radios';
// import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const AddToExistingSwiftCard = ({ goToNextStep }: TStepProps) => {
  // const subscriptions = useFormDataSubscription(['ticketHolderCurrentTown']);
  // const [ticketHolderCurrentTown] = subscriptions;

  return (
    <QuestionCard
      question="Would you like to add the ticket to an existing Swift card?"
      handleContinue={goToNextStep}
    >
      <Radios
        name="swiftCard"
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
          { text: 'Yes', html: null, value: 'yes', info: null },
          { text: 'No, I need a new card', html: null, value: 'no', info: null },
        ]}
      />
    </QuestionCard>
  );
};

export default AddToExistingSwiftCard;
