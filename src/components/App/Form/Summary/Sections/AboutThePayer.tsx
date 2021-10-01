import Table from 'components/shared/Table/Table';
import { useFormDataContext } from 'state/formDataState/context';
import ChangeAnswer from './ChangeAnswer/ChangeAnswer';

const AboutThePayer = () => {
  const [formDataState] = useFormDataContext();
  const {
    applicationForMe,
    payerFirstName,
    payerLastName,
    payerDateOfBirth,
    payerEmailAddress,
    payerMobilePhoneNumber,
    payerCurrentAddressLine1,
    payerCurrentAddressLine2,
    payerCurrentAddressLine3,
    payerCurrentAddressLine4,
    payerCurrentPostcode,
  } = formDataState;

  return (
    <Table
      title="About the payer"
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={[
        [
          <span>Are you buying the ticket for yourself?</span>,
          <span>{applicationForMe ? 'Yes' : 'No'}</span>,
          <ChangeAnswer from="CheckIfUserIsTheTicketHolder" />,
        ],
        [
          <span>Payer&apos;s name</span>,
          <span>{`${payerFirstName} ${payerLastName}`}</span>,
          <ChangeAnswer from="PayerOrTicketHolderName" />,
        ],
        [
          <span>Payer&apos;s date of birth</span>,
          <span>{payerDateOfBirth?.toLocaleDateString()}</span>,
          <ChangeAnswer from="PayerOrTicketHolderBirthDate" />,
        ],
        [
          <span>Payer&apos;s contact details</span>,
          <>
            <p className="wmnds-m-b-none">{payerMobilePhoneNumber}</p>
            <p className="wmnds-m-b-none">{payerEmailAddress}</p>
          </>,
          <ChangeAnswer from="PayerOrTicketHolderContactDetails" />,
        ],
        [
          <span>Payer&apos;s address</span>,
          <>
            <p className="wmnds-m-b-none">{payerCurrentAddressLine1}</p>
            <p className="wmnds-m-b-none">{payerCurrentAddressLine2}</p>
            <p className="wmnds-m-b-none">{payerCurrentAddressLine3}</p>
            <p className="wmnds-m-b-none">{payerCurrentAddressLine4}</p>
            <p className="wmnds-m-b-none">{payerCurrentPostcode}</p>
          </>,
          <ChangeAnswer from="PayerOrTicketHolderAddress" />,
        ],
      ]}
    />
  );
};

export default AboutThePayer;
