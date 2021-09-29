import { useGlobalContext } from 'state/globalState/context';
import { TSectionAndStepRange } from 'state/globalState/types';
import { TSectionAndStep } from 'types/subscription';
import { TChangeAnswerProps } from './ChangeAnswer.types';

const ChangeAnswer = ({ from, to }: TChangeAnswerProps) => {
  const [, globalStateDispatch] = useGlobalContext();

  const handleClick = () => {
    let payload: TSectionAndStep | TSectionAndStepRange;

    if (to) payload = { from, to };
    else payload = from;

    globalStateDispatch({ type: 'EDIT_FORM', payload });
  };

  return (
    <button type="button" className="wmnds-btn wmnds-btn--link" onClick={handleClick}>
      Change
    </button>
  );
};

export default ChangeAnswer;
