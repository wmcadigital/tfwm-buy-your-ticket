import { useEffect } from 'react';
import DatePicker from 'components/shared/DatePicker/DatePicker';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';
import Question from 'components/shared/Question/Question';
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
    <Question question="When would you like the ticket to start?" handleContinue={handleContinue}>
      <DatePicker
        startDate={startDate.value}
        setStartDate={startDate.set}
        availableDates={availableDates}
      />
    </Question>
  );
};

export default TicketStartDate;
