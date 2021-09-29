import Table from 'components/shared/Table/Table';
import { useFormDataContext } from 'state/formDataState/context';
import ChangeAnswer from './ChangeAnswer/ChangeAnswer';

const AboutTheTicketUser = () => {
  const [formDataState] = useFormDataContext();
  const {
    ticketHolderFirstName,
    ticketHolderLastName,
    ticketHolderDateOfBirth,
    ticketHolderCurrentAddressLine1,
    ticketHolderCurrentAddressLine2,
    ticketHolderCurrentAddressLine3,
    ticketHolderCurrentAddressLine4,
    ticketHolderCurrentPostcode,
    filename,
  } = formDataState;

  return (
    <Table
      title="About the ticket user"
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={[
        [
          <span>Name</span>,
          <span>{`${ticketHolderFirstName.savedValue} ${ticketHolderLastName.savedValue}`}</span>,
          <ChangeAnswer from={{ section: 2, step: 1 }} to={{ section: 2, step: 2 }} />,
        ],
        [
          <span>Date of birth</span>,
          <span>{ticketHolderDateOfBirth.savedValue?.toLocaleDateString()}</span>,
          <ChangeAnswer from={ticketHolderDateOfBirth.subscriptions[0]} />,
        ],
        [
          <span>Address</span>,
          <>
            <p className="wmnds-m-b-none">{ticketHolderCurrentAddressLine1.savedValue}</p>
            <p className="wmnds-m-b-none">{ticketHolderCurrentAddressLine2.savedValue}</p>
            <p className="wmnds-m-b-none">{ticketHolderCurrentAddressLine3.savedValue}</p>
            <p className="wmnds-m-b-none">{ticketHolderCurrentAddressLine4.savedValue}</p>
            <p className="wmnds-m-b-none">{ticketHolderCurrentPostcode.savedValue}</p>
          </>,
          <ChangeAnswer from={ticketHolderCurrentAddressLine1.subscriptions[0]} />, // Or any other the other address items
        ],
        [
          <span>Photo</span>,
          <>
            <img src={filename.savedValue!} alt="" />
          </>,
          <ChangeAnswer from={filename.subscriptions[0]} />,
        ],
      ]}
    />
  );
};

export default AboutTheTicketUser;
