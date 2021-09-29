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
          <ChangeAnswer subscription={applicationForMe} />,
        ],
        [
          <span>Name</span>,
          <span>{`${ticketHolderFirstName.savedValue} ${ticketHolderLastName.savedValue}`}</span>,
          <ChangeAnswer subscription={ticketHolderFirstName} />, // or ticketHolderLastName
        ],
        [
          <span>Date of birth</span>,
          <span>{ticketHolderDateOfBirth.savedValue?.toLocaleDateString()}</span>,
          <ChangeAnswer subscription={ticketHolderDateOfBirth} />,
        ],
        [
          <span>Contact details</span>,
          <>
            <p className="wmnds-m-b-none">{ticketHolderMobilePhoneNumber.savedValue}</p>
            <p className="wmnds-m-b-none">{ticketHolderEmailAddress.savedValue}</p>
          </>,
          <ChangeAnswer subscription={ticketHolderMobilePhoneNumber} />, // or ticketHolderEmailAddress
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

export default AboutYou;
