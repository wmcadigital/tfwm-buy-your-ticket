import { useGlobalContext } from 'state/globalState/context';
import { TChangeAnswerProps } from './ChangeAnswer.types';

const ChangeAnswer = ({ subscription }: TChangeAnswerProps) => {
  const [, globalStateDispatch] = useGlobalContext();

  const handleClick = () => {
    const subscriptionStep = subscription.subscriptions[0];
    globalStateDispatch({ type: 'EDIT_STEP', payload: subscriptionStep });
  };

  return (
    <button type="button" className="wmnds-btn wmnds-btn--link" onClick={handleClick}>
      Change
    </button>
  );
};

export default ChangeAnswer;
