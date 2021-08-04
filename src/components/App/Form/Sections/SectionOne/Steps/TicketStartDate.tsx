import Button from 'components/shared/Button';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const TicketStartDate = ({ goToNextStep }: TStepProps) => {
  const [startDate] = useFormDataSubscription(['startDate']);

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
        <input
          className="wmnds-fe-input"
          id="input"
          name="input"
          type="text"
          value={(startDate.value as string | number) || ''}
          onChange={(e) => startDate.set(e.target.value)}
        />
      </div>
      <Button type="button" text="Continue" onClick={goToNextStep} />
    </>
  );
};

export default TicketStartDate;
