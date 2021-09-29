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
          <span>{applicationForMe.savedValue ? 'Yes' : 'No'}</span>,
          <ChangeAnswer from={applicationForMe.subscriptions[0]} />,
        ],
        [
          <span>Name</span>,
          <span>{`${ticketHolderFirstName.savedValue} ${ticketHolderLastName.savedValue}`}</span>,
          <ChangeAnswer from={ticketHolderFirstName.subscriptions[0]} />, // or ticketHolderLastName
        ],
        [
          <span>Date of birth</span>,
          <span>{ticketHolderDateOfBirth.savedValue?.toLocaleDateString()}</span>,
          <ChangeAnswer from={ticketHolderDateOfBirth.subscriptions[0]} />,
        ],
        [
          <span>Contact details</span>,
          <>
            <p className="wmnds-m-b-none">{ticketHolderMobilePhoneNumber.savedValue}</p>
            <p className="wmnds-m-b-none">{ticketHolderEmailAddress.savedValue}</p>
          </>,
          <ChangeAnswer from={ticketHolderMobilePhoneNumber.subscriptions[0]} />, // or ticketHolderEmailAddress
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

export default AboutYou;
