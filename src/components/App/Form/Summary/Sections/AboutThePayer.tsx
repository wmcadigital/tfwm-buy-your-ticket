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
          <span>{applicationForMe.value ? 'Yes' : 'No'}</span>,
          <ChangeAnswer subscription={applicationForMe} />,
        ],
        [
          <span>Payer&apos;s name</span>,
          <span>{`${payerFirstName.value} ${payerLastName.value}`}</span>,
          <ChangeAnswer subscription={payerFirstName} />,
        ],
        [
          <span>Payer&apos;s date of birth</span>,
          <span>{payerDateOfBirth.value?.toLocaleDateString()}</span>,
          <ChangeAnswer subscription={payerDateOfBirth} />,
        ],
        [
          <span>Payer&apos;s contact details</span>,
          <>
            <p className="wmnds-m-b-none">{payerMobilePhoneNumber.value}</p>
            <p className="wmnds-m-b-none">{payerEmailAddress.value}</p>
          </>,
          <ChangeAnswer subscription={payerMobilePhoneNumber} />, // or payerEmailAddress />
        ],
        [
          <span>Payer&apos;s address</span>,
          <>
            <p className="wmnds-m-b-none">{payerCurrentAddressLine1.value}</p>
            <p className="wmnds-m-b-none">{payerCurrentAddressLine2.value}</p>
            <p className="wmnds-m-b-none">{payerCurrentAddressLine3.value}</p>
            <p className="wmnds-m-b-none">{payerCurrentAddressLine4.value}</p>
            <p className="wmnds-m-b-none">{payerCurrentPostcode.value}</p>
          </>,
          <ChangeAnswer subscription={payerCurrentAddressLine1} />, // Or any other the other address items
        ],
      ]}
    />
  );
};

export default AboutThePayer;
