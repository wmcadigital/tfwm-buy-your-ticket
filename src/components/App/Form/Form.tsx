import { useGlobalContext } from 'state/globalState/context';
import BackButton from 'components/shared/BackButton';

import s from './Form.module.scss';
import StartPage from './StartPage';
import Form from './Questions';
import Summary from './Summary';

const ViewToShow = () => {
  const [globalState] = useGlobalContext();
  const { isStarted, isEditing, isFinished, isSubmitted } = globalState.form;

  const showStartPage = !isStarted;
  const showForm = isStarted && (!isFinished || isEditing);
  const showSummary = isStarted && isFinished && !isEditing;
  const showSuccess = isStarted && isFinished && !isEditing && isSubmitted;

  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
      {!showStartPage && !showSuccess && (
        <div className="wmnds-col-1 wmnds-m-b-lg">
          <BackButton />
        </div>
      )}
      <div className="wmnds-col-1 wmnds-col-md-3-4">
        <div className={`${s.card} bg-white wmnds-m-b-lg`}>
          {showStartPage && <StartPage />}
          {showForm && <Form />}
          {showSummary && <Summary />}
          {/* {showSuccess && <Success />} */}
        </div>
      </div>
    </div>
  );
};

export default ViewToShow;
