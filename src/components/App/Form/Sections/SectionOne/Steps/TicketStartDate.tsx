import { useEffect } from 'react';
import Loader from 'components/shared/Loader/Loader';
import GenericError from 'components/shared/Errors/GenericError';
import DatePickerInput from 'components/shared/DatePickerInput/DatePickerInput';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';
import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import useGetTicketAvailableStartingDates from '../../customHooks/useGetTicketAvailableStartingDates/useGetTicketAvailableStartingDates';

const TicketStartDate = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const startDate = useFormDataSubscription('startDate');
  const { availableDates, isLoading, hasError } = useGetTicketAvailableStartingDates();

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
      {!startDate && isLoading && <Loader />}
      {!isLoading && hasError && <GenericError errors={{ error: 'Request failed' }} />}
      {!isLoading && !hasError && availableDates && startDate.value && (
        <DatePickerInput
          startDate={startDate.value}
          setStartDate={startDate.set}
          availableDates={availableDates}
        />
      )}
    </QuestionCard>
  );
};

export default TicketStartDate;
