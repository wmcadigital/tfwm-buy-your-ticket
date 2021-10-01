import { useEffect } from 'react';

import { useGlobalContext } from 'state/globalState/context';

import useNavigationLogic from 'customHooks/useNavigationLogic/useNavigationLogic';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

import DatePicker from 'components/shared/DatePicker/DatePicker';
import Question from 'components/shared/Question/Question';

const TicketStartDate = () => {
  const { goToNextStep } = useNavigationLogic('StartPage', 'AddToExistingSwiftCard');
  const startDate = useFormDataSubscription('startDate');

  const [globalState] = useGlobalContext();
  const { availableDates } = globalState.ticket;

  useEffect(() => {
    if (availableDates && !startDate.currentValue) startDate.set(availableDates[0]);
  }, [availableDates, startDate]);

  const handleContinue = () => {
    if (!startDate.save()) return;
    goToNextStep();
  };

  return (
    <Question question="When would you like the ticket to start?" handleContinue={handleContinue}>
      <DatePicker
        startDate={startDate.currentValue}
        setStartDate={startDate.set}
        availableDates={availableDates}
      />
    </Question>
  );
};

export default TicketStartDate;
