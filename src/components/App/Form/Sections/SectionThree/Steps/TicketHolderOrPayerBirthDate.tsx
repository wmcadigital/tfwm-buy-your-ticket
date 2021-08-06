import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import DateInputs from 'components/shared/Date/DateInputs';

// import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const TicketHolderOrPayerBirthDate = ({ stepNavigation, currentSection }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  // const ticketHolderDateOfBirth = useFormDataSubscription('ticketHolderDateOfBirth');
  // const ticketHolderFirstName = useFormDataSubscription('ticketHolderFirstName');
  // const ticketHolderLastName = useFormDataSubscription('ticketHolderLastName');

  // const subscriptions = useFormDataSubscription(['ticketHolderCurrentTown']);
  // const [ticketHolderCurrentTown] = subscriptions;
  // eslint-disable-next-line no-console
  console.log(currentSection);

  return (
    <QuestionCard question="Are you buying the ticket for yourself?" handleContinue={goToNextStep}>
      <DateInputs name="DateOfBirth" />
    </QuestionCard>
  );
};

export default TicketHolderOrPayerBirthDate;
