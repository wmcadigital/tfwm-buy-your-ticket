import { useFormDataContext } from 'state/formDataState/context';
// import { useGlobalContext } from 'state/globalState/context';
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
  const [formDataState] = useFormDataContext();
  const { applicationForMe } = formDataState;

  // const [globalState] = useGlobalContext();

  return (
    <div className={s.summaryTable}>
      <h2>Check your answers</h2>
      <AboutTheTicket />
      {applicationForMe.value ? (
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
