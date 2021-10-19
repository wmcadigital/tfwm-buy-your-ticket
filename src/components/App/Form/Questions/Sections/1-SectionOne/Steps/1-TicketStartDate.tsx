import { useEffect } from 'react';

import { useGlobalContext } from 'state/globalState';
import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { DatePicker, Question } from 'components/shared';

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
