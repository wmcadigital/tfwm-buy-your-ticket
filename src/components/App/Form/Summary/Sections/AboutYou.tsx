import { useFormDataContext } from 'state/formDataState';
import { useGlobalContext } from 'state/globalState';
import { Table, ChangeAnswerButton } from 'components/shared';
import {
  AddressCell,
  ContactDetailsCell,
  DateCell,
  FileCell,
  ImageCell,
} from 'components/sharedTableCells';
import { isNotNull } from 'helpers/misc';
import { removeNthItem } from 'helpers/summary';

const AboutYou = () => {
  const [globalState] = useGlobalContext();
  const { isStudent } = globalState.ticket.raw;

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
    ticketHolderPhoto,
    studentIdPhoto,
    studentProofDocument,
    identityDocument,
  } = formDataState;

  const filesConfig = isNotNull(studentIdPhoto)
    ? [{ title: 'Student ID Card', file: studentIdPhoto! }]
    : [
        { title: 'Student Proof Document', file: studentProofDocument! },
        { title: 'Identity Document', file: identityDocument! },
      ];

  const tableValues = [
    [
      <span>Are you buying the ticket for yourself?</span>,
      <span>{applicationForMe ? 'Yes' : 'No'}</span>,
      <ChangeAnswerButton from="CheckIfUserIsTheTicketHolder" />,
    ],
    [
      <span>Name</span>,
      <span>{`${ticketHolderFirstName} ${ticketHolderLastName}`}</span>,
      <ChangeAnswerButton from="PayerOrTicketHolderName" />, // or ticketHolderLastName
    ],
    [
      <span>Date of birth</span>,
      <DateCell date={ticketHolderDateOfBirth!} />,
      <ChangeAnswerButton from="PayerOrTicketHolderBirthDate" />,
    ],
    [
      <span>Contact details</span>,
      <ContactDetailsCell
        phoneNumber={ticketHolderMobilePhoneNumber!}
        emailAddress={ticketHolderEmailAddress!}
      />,
      <ChangeAnswerButton from="PayerOrTicketHolderContactDetails" />, // or ticketHolderEmailAddress
    ],
    [
      <span>Address</span>,
      <AddressCell
        line1={ticketHolderCurrentAddressLine1!}
        line2={ticketHolderCurrentAddressLine2!}
        line3={ticketHolderCurrentAddressLine3}
        line4={ticketHolderCurrentAddressLine4}
        postcode={ticketHolderCurrentPostcode!}
      />,
      <ChangeAnswerButton from="PayerOrTicketHolderAddress" />, // Or any other the other address items
    ],
    [
      <span>Photo</span>,
      <ImageCell image={ticketHolderPhoto!} />,
      <ChangeAnswerButton from="PayerOrTicketHolderPhoto" />,
    ],
    [
      <span>Proof you&apos;re a student</span>,
      <FileCell filesConfig={filesConfig} />,
      <ChangeAnswerButton from="PayerOrTicketHolderStudentProof" />,
    ],
  ];

  return (
    <Table
      title="About you"
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={isStudent ? tableValues : removeNthItem(tableValues, 7)}
    />
  );
};

export default AboutYou;
