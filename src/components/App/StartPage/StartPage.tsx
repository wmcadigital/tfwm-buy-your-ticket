import Button from 'components/shared/Button';
import Loader from 'components/shared/Loader/Loader';
import { useGlobalContext } from 'state/globalState/context';
import { TTicket } from 'types/ticket';
import useGetTicketInfo from './customHooks/useGetTicketInfo/useGetTicketInfo';
import TicketCard from './TicketCard/TicketCard';

const StartPage = () => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { ticket } = globalState;

  const { isLoading, hasError, ticketInfo } = useGetTicketInfo(ticket.id);

  const startForm = () => {
    globalStateDispatch({ type: 'ADD_TICKET_INFO', payload: ticketInfo as TTicket });
    globalStateDispatch({ type: 'START_FORM' });
  };

  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
      <div className="wmnds-col-1 wmnds-col-md-3-4">
        <h1>Buy on Direct Debit</h1>
        <h2>Your ticket</h2>
        <div className="wmnds-m-b-md">
          {!ticketInfo || isLoading ? <Loader /> : <TicketCard ticket={ticketInfo} />}
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
          disabled={!ticketInfo?.name || hasError || isLoading}
          onClick={startForm}
        />
      </div>
    </div>
  );
};

export default StartPage;
