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
          <span>{applicationForMe.savedValue ? 'Yes' : 'No'}</span>,
          <ChangeAnswer subscription={applicationForMe} />,
        ],
        [
          <span>Payer&apos;s name</span>,
          <span>{`${payerFirstName.savedValue} ${payerLastName.savedValue}`}</span>,
          <ChangeAnswer subscription={payerFirstName} />,
        ],
        [
          <span>Payer&apos;s date of birth</span>,
          <span>{payerDateOfBirth.savedValue?.toLocaleDateString()}</span>,
          <ChangeAnswer subscription={payerDateOfBirth} />,
        ],
        [
          <span>Payer&apos;s contact details</span>,
          <>
            <p className="wmnds-m-b-none">{payerMobilePhoneNumber.savedValue}</p>
            <p className="wmnds-m-b-none">{payerEmailAddress.savedValue}</p>
          </>,
          <ChangeAnswer subscription={payerMobilePhoneNumber} />, // or payerEmailAddress />
        ],
        [
          <span>Payer&apos;s address</span>,
          <>
            <p className="wmnds-m-b-none">{payerCurrentAddressLine1.savedValue}</p>
            <p className="wmnds-m-b-none">{payerCurrentAddressLine2.savedValue}</p>
            <p className="wmnds-m-b-none">{payerCurrentAddressLine3.savedValue}</p>
            <p className="wmnds-m-b-none">{payerCurrentAddressLine4.savedValue}</p>
            <p className="wmnds-m-b-none">{payerCurrentPostcode.savedValue}</p>
          </>,
          <ChangeAnswer subscription={payerCurrentAddressLine1} />, // Or any other the other address items
        ],
      ]}
    />
  );
};

export default AboutThePayer;
