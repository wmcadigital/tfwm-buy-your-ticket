import { useEffect } from 'react';
import DatePickerInput from 'components/shared/DatePickerInput/DatePickerInput';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';
import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import { useGlobalContext } from 'state/globalState/context';

const TicketStartDate = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const startDate = useFormDataSubscription('startDate');

  const [globalState] = useGlobalContext();
  const { availableDates } = globalState.ticket;

  useEffect(() => {
    if (availableDates && !startDate.value) startDate.set(availableDates[0]);
  }, [availableDates, startDate]);

  const handleContinue = () => {
    // Validation goes here
    startDate.save();
    goToNextStep();
  };

  return (
    <QuestionCard
      question="When would you like the ticket to start?"
      handleContinue={handleContinue}
    >
      <DatePickerInput
        startDate={startDate.value}
        setStartDate={startDate.set}
        availableDates={availableDates}
      />
    </QuestionCard>
  );
};

export default TicketStartDate;
