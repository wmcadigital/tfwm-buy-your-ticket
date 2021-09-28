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
          <span>{`${ticketHolderFirstName.value} ${ticketHolderLastName.value}`}</span>,
          <ChangeAnswer subscription={ticketHolderFirstName} />, // Or ticketHolderLastName
        ],
        [
          <span>Date of birth</span>,
          <span>{ticketHolderDateOfBirth.value?.toLocaleDateString()}</span>,
          <ChangeAnswer subscription={ticketHolderDateOfBirth} />,
        ],
        [
          <span>Address</span>,
          <>
            <p className="wmnds-m-b-none">{ticketHolderCurrentAddressLine1.value}</p>
            <p className="wmnds-m-b-none">{ticketHolderCurrentAddressLine2.value}</p>
            <p className="wmnds-m-b-none">{ticketHolderCurrentAddressLine3.value}</p>
            <p className="wmnds-m-b-none">{ticketHolderCurrentAddressLine4.value}</p>
            <p className="wmnds-m-b-none">{ticketHolderCurrentPostcode.value}</p>
          </>,
          <ChangeAnswer subscription={ticketHolderCurrentAddressLine1} />, // Or any other the other address items
        ],
        [
          <span>Photo</span>,
          <>
            <img src={filename.value!} alt="" />
          </>,
          <ChangeAnswer subscription={filename} />,
        ],
      ]}
    />
  );
};

export default AboutTheTicketUser;
