import { useState } from 'react';
import { useFormDataContext } from 'state/formDataState/context';
import { useGlobalContext } from 'state/globalState/context';
import NIconText from 'components/shared/NIconText';
import Table from 'components/shared/Table/Table';
import Message from 'components/shared/Message/Message';
import ChangeAnswer from './ChangeAnswer/ChangeAnswer';

const AboutTheTicket = () => {
  const [formDataState] = useFormDataContext();
  const { startDate, addProductToExistingCard } = formDataState;

  const [globalState] = useGlobalContext();
  const { ticket } = globalState;
  const ticketName = ticket.name || 'Monthly Direct Debit nBus West Midlands';
  const priceString = ticket.priceString || '£64.00 per month';

  // Change ticket
  const [isChangingTicket, setIsChangingTicket] = useState(false);
  const showChangeTicketMessage = () => setIsChangingTicket(true);
  const hideChangeTicketMessage = () => setIsChangingTicket(false);
  const removeSecondIndex = (array: any[]) => {
    array.splice(1, 1);
    return array;
  };

  const changeTicketMessage = (
    <div>
      <Message
        type="warning"
        title="Are you sure you want to change your ticket?"
        content={
          <p style={{ fontWeight: 'normal' }} className="wmnds-m-b-none wmnds-m-t-sm">
            You’ll need to re-enter your details if you change your ticket.
          </p>
        }
      />
      <button
        type="button"
        className="wmnds-btn wmnds-btn--primary wmnds-m-r-sm wmnds-m-b-sm"
        onClick={() => console.log('Changing ticket')}
      >
        Change my ticket
      </button>
      <button
        type="button"
        className="wmnds-btn wmnds-btn--secondary"
        onClick={hideChangeTicketMessage}
      >
        Cancel
      </button>
    </div>
  );

  const ticketPayementDate = (() => {
    const paymentDate = new Date();
    paymentDate.setDate(startDate!?.getDate() + 1);
    return paymentDate;
  })();

  const tableValues = [
    [
      <span>Ticket</span>,
      <div>
        <p className="wmnds-m-b-md">
          <NIconText text={ticketName} />
        </p>
        <p className="wmnds-m-b-none">
          <strong>{priceString}</strong>
        </p>
      </div>,
      <button type="button" className="wmnds-btn wmnds-btn--link" onClick={showChangeTicketMessage}>
        Change
      </button>,
    ],
    [<>{changeTicketMessage}</>],
    [
      <span>Ticket starts from</span>,
      <div>
        <span>
          {startDate?.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>,
      <ChangeAnswer from="TicketStartDate" />,
    ],
    [
      <span>Payment date</span>,
      <div>
        <span>
          {ticketPayementDate?.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>,
      <ChangeAnswer from="TicketStartDate" />,
    ],
    [
      <span>Add to existing Swift card</span>,
      <span>{addProductToExistingCard ? 'Yes' : 'No'}</span>,
      <ChangeAnswer from="AddToExistingSwiftCard" to="AddSwiftCardNumber" />,
    ],
  ];

  const tableCellClasses = ['', '', 'wmnds-text-align-right'];
  const tableCellColSpans = [0, 3, 0, 0, 0];

  return (
    <Table
      title="About the ticket"
      values={isChangingTicket ? tableValues : removeSecondIndex(tableValues)}
      cellClasses={tableCellClasses}
      cellColSpans={isChangingTicket ? tableCellColSpans : removeSecondIndex(tableCellColSpans)}
    />
  );
};

export default AboutTheTicket;
