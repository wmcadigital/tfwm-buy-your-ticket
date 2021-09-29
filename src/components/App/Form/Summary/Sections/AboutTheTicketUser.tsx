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
          <ChangeAnswer subscription={ticketHolderFirstName} />, // Or ticketHolderLastName
        ],
        [
          <span>Date of birth</span>,
          <span>{ticketHolderDateOfBirth.savedValue?.toLocaleDateString()}</span>,
          <ChangeAnswer subscription={ticketHolderDateOfBirth} />,
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
          <ChangeAnswer subscription={ticketHolderCurrentAddressLine1} />, // Or any other the other address items
        ],
        [
          <span>Photo</span>,
          <>
            <img src={filename.savedValue!} alt="" />
          </>,
          <ChangeAnswer subscription={filename} />,
        ],
      ]}
    />
  );
};

export default AboutTheTicketUser;
