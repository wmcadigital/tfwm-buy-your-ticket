import { useFormDataContext } from 'state/formDataState/context';
import { Table, ChangeAnswerButton } from 'components/shared';
import { AddressCell, ContactDetailsCell, DateCell } from 'components/sharedTableCells';

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
          <ChangeAnswerButton from="CheckIfUserIsTheTicketHolder" />,
        ],
        [
          <span>Payer&apos;s name</span>,
          <span>{`${payerFirstName} ${payerLastName}`}</span>,
          <ChangeAnswerButton from="PayerOrTicketHolderName" />,
        ],
        [
          <span>Payer&apos;s date of birth</span>,
          <DateCell date={payerDateOfBirth!} />,
          <ChangeAnswerButton from="PayerOrTicketHolderBirthDate" />,
        ],
        [
          <span>Payer&apos;s contact details</span>,
          <ContactDetailsCell
            phoneNumber={payerMobilePhoneNumber!}
            emailAddress={payerEmailAddress!}
          />,
          <ChangeAnswerButton from="PayerOrTicketHolderContactDetails" />,
        ],
        [
          <span>Payer&apos;s address</span>,
          <AddressCell
            line1={payerCurrentAddressLine1!}
            line2={payerCurrentAddressLine2!}
            line3={payerCurrentAddressLine3}
            line4={payerCurrentAddressLine4}
            postcode={payerCurrentPostcode!}
          />,
          <ChangeAnswerButton from="PayerOrTicketHolderAddress" />,
        ],
      ]}
    />
  );
};

export default AboutThePayer;
