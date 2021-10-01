import Table from 'components/shared/Table/Table';
import { useFormDataContext } from 'state/formDataState/context';
import ChangeAnswer from './ChangeAnswer/ChangeAnswer';

const AboutYou = () => {
  const [formDataState] = useFormDataContext();
  const {
    applicationForMe,
    ticketHolderFirstName,
    ticketHolderLastName,
    ticketHolderDateOfBirth,
    ticketHolderEmailAddress,
    ticketHolderMobilePhoneNumber,
    ticketHolderCurrentAddressLine1,
    ticketHolderCurrentAddressLine2,
    ticketHolderCurrentAddressLine3,
    ticketHolderCurrentAddressLine4,
    ticketHolderCurrentPostcode,
    filename,
  } = formDataState;

  return (
    <Table
      title="About you"
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={[
        [
          <span>Are you buying the ticket for yourself?</span>,
          <span>{applicationForMe ? 'Yes' : 'No'}</span>,
          <ChangeAnswer from="CheckIfUserIsTheTicketHolder" />,
        ],
        [
          <span>Name</span>,
          <span>{`${ticketHolderFirstName} ${ticketHolderLastName}`}</span>,
          <ChangeAnswer from="PayerOrTicketHolderName" />, // or ticketHolderLastName
        ],
        [
          <span>Date of birth</span>,
          <span>{ticketHolderDateOfBirth?.toLocaleDateString()}</span>,
          <ChangeAnswer from="PayerOrTicketHolderBirthDate" />,
        ],
        [
          <span>Contact details</span>,
          <>
            <p className="wmnds-m-b-none">{ticketHolderMobilePhoneNumber}</p>
            <p className="wmnds-m-b-none">{ticketHolderEmailAddress}</p>
          </>,
          <ChangeAnswer from="PayerOrTicketHolderContactDetails" />, // or ticketHolderEmailAddress
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
          <ChangeAnswer from="PayerOrTicketHolderAddress" />, // Or any other the other address items
        ],
        [
          <span>Photo</span>,
          <>
            <img src={filename!} alt="" />
          </>,
          <ChangeAnswer from="PayerOrTicketHolderPhoto" />,
        ],
      ]}
    />
  );
};

export default AboutYou;
