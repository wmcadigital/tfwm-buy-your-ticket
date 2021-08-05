import { useState, useEffect } from 'react';
import Loader from 'components/shared/Loader/Loader';
import GenericError from 'components/shared/Errors/GenericError';
import DatePickerInput from 'components/shared/DatePickerInput/DatePickerInput';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';
import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import useGetTicketAvailableStartingDates from '../../customHooks/useGetTicketAvailableStartingDates/useGetTicketAvailableStartingDates';

const TicketStartDate = ({ goToNextStep }: TStepProps) => {
  const [startDateData] = useFormDataSubscription(['startDate']);
  const [startDate, setStartDate] = useState(startDateData.value as Date);
  const { availableDates, isLoading, hasError } = useGetTicketAvailableStartingDates();
  useEffect(() => {
    if (availableDates && !startDate) setStartDate(availableDates[0]);
  }, [availableDates, startDate]);

  const handleContinue = () => {
    startDateData.set(startDate);
    goToNextStep();
  };

  return (
    <QuestionCard
      question="When would you like the ticket to start?"
      handleContinue={handleContinue}
    >
      {!startDate && isLoading && <Loader />}
      {!isLoading && hasError && <GenericError errors={{ error: 'Request failed' }} />}
      {!isLoading && !hasError && availableDates && startDate && (
        <DatePickerInput
          startDate={startDate}
          setStartDate={setStartDate}
          availableDates={availableDates}
        />
      )}
    </QuestionCard>
  );
};

export default TicketStartDate;
