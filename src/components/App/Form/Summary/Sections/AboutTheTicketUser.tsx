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
    file,
    filename,
  } = formDataState;

  return (
    <Table
      title="About the ticket user"
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={[
        [
          <span>Name</span>,
          <span>{`${ticketHolderFirstName} ${ticketHolderLastName}`}</span>,
          <ChangeAnswer from="TicketHolderName" />,
        ],
        [
          <span>Date of birth</span>,
          <span>{ticketHolderDateOfBirth?.toLocaleDateString()}</span>,
          <ChangeAnswer from="TicketHolderBirthDate" />,
        ],
        [
          <span>Address</span>,
          <>
            <p className="wmnds-m-b-none">{ticketHolderCurrentAddressLine1}</p>
            <p className="wmnds-m-b-none">{ticketHolderCurrentAddressLine2}</p>
            <p className="wmnds-m-b-none">{ticketHolderCurrentAddressLine3}</p>
            <p className="wmnds-m-b-none">{ticketHolderCurrentAddressLine4}</p>
            <p className="wmnds-m-b-none">{ticketHolderCurrentPostcode}</p>
          </>,
          <ChangeAnswer from="TicketHolderAddress" />, // Or any other the other address items
        ],
        [
          <span>Photo</span>,
          <>
            <p className="wmnds-m-b-sm">{filename}</p>
            <img src={URL.createObjectURL(file)} alt="" />
          </>,
          <ChangeAnswer from="TicketHolderPhoto" />,
        ],
      ]}
    />
  );
};

export default AboutTheTicketUser;
