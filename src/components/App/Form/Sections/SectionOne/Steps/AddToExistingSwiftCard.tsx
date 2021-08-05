import Button from 'components/shared/Button';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const AddToExistingSwiftCard = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const ticketHolderCurrentTown = useFormDataSubscription('ticketHolderCurrentTown');

  const handleContinue = () => {
    ticketHolderCurrentTown.save();
    goToNextStep();
  };

  return (
    <>
      <h2 className="wmnds-m-t-lg">Would you like to add the ticket to an existing Swift card?</h2>
      <p>Your Swift card needs to:</p>
      <ul>
        <li>have a photo on</li>
        <li>
          begin with <strong>633597 0107</strong>
        </li>
      </ul>
      <div className="wmnds-fe-group">
        <label className="wmnds-fe-label" htmlFor="input">
          Current town
        </label>
        <input
          className="wmnds-fe-input"
          id="input"
          name="input"
          type="text"
          value={(ticketHolderCurrentTown.value as string | number) || ''}
          onChange={(e) => ticketHolderCurrentTown.set(e.target.value)}
        />
      </div>
      <Button type="button" text="Continue" onClick={handleContinue} />
    </>
  );
};

export default AddToExistingSwiftCard;
