import { useEffect } from 'react';
import { useFormDataContext } from 'state/formDataState';
import { useGlobalContext } from 'state/globalState';
import { useNavigationLogic } from 'customHooks';

import {
  AboutThePayer,
  AboutYou,
  AboutTheTicketUser,
  AboutTheTicket,
  DirectDebit,
  SendRequest,
} from './Sections';

import s from './Summary.module.scss';

const Summary = () => {
  const [formDataState, formDataDispatch] = useFormDataContext();
  const { applicationForMe } = formDataState;

  const [globalState, globalStateDispatch] = useGlobalContext();
  const { temporaryData } = globalState.form.edit;

  useNavigationLogic('HowDidYouFindOutAboutDD');

  useEffect(() => {
    formDataDispatch({ type: 'UPDATE_FORM_DATA', payload: temporaryData });
    globalStateDispatch({ type: 'CLEAR_TEMP_FORM_DATA' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.summaryTable}>
      <h2>Check your answers</h2>
      <AboutTheTicket />
      {applicationForMe ? (
        <AboutYou />
      ) : (
        <>
          <AboutTheTicketUser />
          <AboutThePayer />
        </>
      )}
      <DirectDebit />
      <SendRequest />
    </div>
  );
};

export default Summary;
