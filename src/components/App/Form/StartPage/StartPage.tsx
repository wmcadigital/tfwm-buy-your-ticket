import { Button, Loader } from 'components/shared';

import { useGlobalContext } from 'state/globalState/context';
import { useFormDataContext } from 'state/formDataState/context';

import { TTicket } from 'types/ticket';
import { useGetTicketInfo, useStartSession } from 'customHooks/axiosRequests';
import { TSession } from 'types/session';
import { Nullable } from 'types/helpers';

import TicketCard from './TicketCard/TicketCard';

const StartPage = () => {
  const [, formDataDispatch] = useFormDataContext();
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { ticket } = globalState;

  const ticketInfoRequest = useGetTicketInfo(ticket.id);
  const startSessionRequest = useStartSession();

  const startForm = async () => {
    let session: Nullable<TSession> = null;

    try {
      const response = await startSessionRequest.startSession();
      session = response!?.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }

    if (!session) return;

    formDataDispatch({ type: 'UPDATE_SESSION_DATA', payload: session });
    formDataDispatch({ type: 'UPDATE_TICKET_DATA', payload: ticketInfoRequest.ticketInfo?.raw! });
    globalStateDispatch({
      type: 'ADD_TICKET_INFO',
      payload: ticketInfoRequest.ticketInfo as TTicket,
    });
    globalStateDispatch({ type: 'START_FORM' });
  };

  return (
    <>
      <h1>Buy on Direct Debit</h1>
      <h2>Your ticket</h2>
      <div className="wmnds-m-b-md">
        {!ticketInfoRequest.ticketInfo || ticketInfoRequest.isLoading ? (
          <Loader />
        ) : (
          <TicketCard ticket={ticketInfoRequest.ticketInfo} />
        )}
      </div>
      <h2 className="wmnds-m-b-lg">Before you start</h2>
      <ul>
        <li>
          <p>you need bank details to set up your payments</p>
        </li>
        <li>
          <p>you must have a bank account that can set up Direct Debits</p>
        </li>
        <li>
          <p>it takes us 10 working days to set up a Direct Debit with your bank</p>
        </li>
        <li>
          <p>you need to buy tickets until your Direct Debit ticket starts</p>
        </li>
      </ul>
      <p>
        If you are applying for a student ticket, you also need to prove you are a student with
        either a:
      </p>
      <ul>
        <li>
          <p>student ID card with an expiry date</p>
        </li>
        <li>
          <p>letter from your college or university confirming your student status</p>
        </li>
      </ul>
      <p>This part of the process takes around 5 to 10 minutes.</p>
      <Button
        text="Buy on Direct Debit"
        btnClass="wmnds-btn wmnds-btn--start wmnds-m-t-md"
        iconRight="general-chevron-right"
        disabled={
          !ticketInfoRequest.ticketInfo?.name ||
          ticketInfoRequest.hasError ||
          ticketInfoRequest.isLoading
        }
        isFetching={startSessionRequest.isLoading}
        onClick={startForm}
      />
    </>
  );
};

export default StartPage;
