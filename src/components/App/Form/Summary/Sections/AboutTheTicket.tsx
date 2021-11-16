import { useState } from 'react';
import { useFormDataContext } from 'state/formDataState';
import { useGlobalContext } from 'state/globalState';
import { NIconText, Message, Table, ChangeAnswerButton } from 'components/shared';
import { removeNthItem } from 'helpers/summary';
import { DateCell } from 'components/sharedTableCells';

const AboutTheTicket = () => {
  const [formDataState] = useFormDataContext();
  const { startDate, addProductToExistingCard, outOfCounty } = formDataState;

  const [globalState] = useGlobalContext();
  const { ticket } = globalState;
  const ticketName = ticket.name || 'Monthly Direct Debit nBus West Midlands';
  const priceString = ticket.priceString || '£64.00 per month';

  // Change ticket
  const [isChangingTicket, setIsChangingTicket] = useState(false);
  const showChangeTicketMessage = () => setIsChangingTicket(true);
  const hideChangeTicketMessage = () => setIsChangingTicket(false);

  const handleChangeTicket = () => {
    window.location.href = 'https://find-a-ticket.tfwm.org.uk/';
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
        onClick={handleChangeTicket}
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
    outOfCounty
      ? [
          <span>Out of County station</span>,
          <span>{outOfCounty}</span>,
          <ChangeAnswerButton from="OutOfCounty" />,
        ]
      : [],
    [
      <span>Ticket starts from</span>,
      <DateCell date={startDate!} showDay />,
      <ChangeAnswerButton from="TicketStartDate" />,
    ],
    [
      <span>Payment date</span>,
      <DateCell date={ticketPayementDate!} showDay />,
      <ChangeAnswerButton from="TicketStartDate" />,
    ],
    [
      <span>Add to existing Swift card</span>,
      <span>{addProductToExistingCard ? 'Yes' : 'No'}</span>,
      <ChangeAnswerButton from="AddToExistingSwiftCard" to="AddSwiftCardNumber" />,
    ],
  ];

  const tableCellClasses = ['', '', 'wmnds-text-align-right'];
  const tableCellColSpans = [0, 3, 0, 0, 0];

  return (
    <Table
      title="About the ticket"
      values={isChangingTicket ? tableValues : removeNthItem(tableValues, 2)}
      cellClasses={tableCellClasses}
      cellColSpans={isChangingTicket ? tableCellColSpans : removeNthItem(tableCellColSpans, 2)}
    />
  );
};

export default AboutTheTicket;
