import { getSectionAndStep } from 'helpers/sectionAndStep';
import { useGlobalContext } from 'state/globalState/context';
import { TChangeAnswerProps } from './ChangeAnswer.types';

const ChangeAnswer = ({ from, to }: TChangeAnswerProps) => {
  const [, globalStateDispatch] = useGlobalContext();

  const handleClick = () => {
    const fromStep = getSectionAndStep(from);
    const toStep = to ? getSectionAndStep(to) : null;

    globalStateDispatch({
      type: 'EDIT_FORM',
      payload: toStep ? { from: fromStep, to: toStep } : fromStep,
    });
  };

  return (
    <button type="button" className="wmnds-btn wmnds-btn--link" onClick={handleClick}>
      Change
    </button>
  );
};

export default ChangeAnswer;
