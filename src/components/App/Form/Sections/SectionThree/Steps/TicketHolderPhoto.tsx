import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Radios from 'components/shared/Radios/Radios';

// import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const TicketHolderPhoto = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  // const subscriptions = useFormDataSubscription(['ticketHolderCurrentTown']);
  // const [ticketHolderCurrentTown] = subscriptions;

  return (
    <QuestionCard question="Are you buying the ticket for yourself?" handleContinue={goToNextStep}>
      <Radios
        name=""
        error={null}
        radios={[
          { text: 'Yes', html: null, value: 'yes', info: null },
          { text: 'No', html: null, value: 'no', info: null },
        ]}
      />
    </QuestionCard>
  );
};

export default TicketHolderPhoto;
