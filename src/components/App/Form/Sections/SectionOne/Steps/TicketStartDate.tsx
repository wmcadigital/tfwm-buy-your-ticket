import { useState } from 'react';
import Button from 'components/shared/Button';
import DatePickerInput from 'components/shared/DatePickerInput/DatePickerInput';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const unformatedDates: string[] = [
  '2021-08-13T00:00:00+00:00',
  '2021-08-14T00:00:00+00:00',
  '2021-08-15T00:00:00+00:00',
  '2021-08-16T00:00:00+00:00',
  '2021-08-17T00:00:00+00:00',
  '2021-08-18T00:00:00+00:00',
  '2021-08-19T00:00:00+00:00',
  '2021-08-20T00:00:00+00:00',
  '2021-08-21T00:00:00+00:00',
  '2021-08-22T00:00:00+00:00',
  '2021-08-23T00:00:00+00:00',
  '2021-08-24T00:00:00+00:00',
  '2021-08-25T00:00:00+00:00',
  '2021-08-26T00:00:00+00:00',
  '2021-08-27T00:00:00+00:00',
  '2021-08-28T00:00:00+00:00',
  '2021-08-29T00:00:00+00:00',
  '2021-08-30T00:00:00+00:00',
  '2021-08-31T00:00:00+00:00',
];

const TicketStartDate = ({ goToNextStep }: TStepProps) => {
  const [startDateData] = useFormDataSubscription(['startDate']);

  const availableDates: Date[] = unformatedDates.map((date) => new Date(date));
  const [startDate, setStartDate] = useState((startDateData.value as Date) || availableDates[0]);

  const handleContinue = () => {
    startDateData.set(startDate);
    goToNextStep();
  };

  return (
    <>
      <h2 className="wmnds-m-t-lg">When would you like the ticket to start?</h2>
      <p>
        The soonest your new ticket can start is Monday 16 June. This is to give your bank enough
        time to set up the Direct Debit.
      </p>
      <p>For example, 16/06/2021</p>
      <div className="wmnds-fe-group">
        <label className="wmnds-fe-label" htmlFor="input">
          Start date
        </label>
        <DatePickerInput
          startDate={startDate}
          setStartDate={setStartDate}
          availableDates={availableDates}
        />
      </div>
      <Button type="button" text="Continue" onClick={handleContinue} />
    </>
  );
};

export default TicketStartDate;
