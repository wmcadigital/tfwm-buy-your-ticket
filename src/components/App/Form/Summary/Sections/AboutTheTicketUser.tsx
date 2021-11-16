import { useFormDataContext } from 'state/formDataState';
import { useGlobalContext } from 'state/globalState';
import { Table, ChangeAnswerButton } from 'components/shared';
import { AddressCell, DateCell, FileCell, ImageCell } from 'components/sharedTableCells';
import { removeNthItem } from 'helpers/summary';
import { isNotNull } from 'helpers/misc';

const AboutTheTicketUser = () => {
  const [globalState] = useGlobalContext();
  const { isStudent } = globalState.ticket.raw;

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
    ticketHolderPhoto,
    studentIdPhoto,
    studentProofDocument,
    identityDocument,
    isApprentice,
    schoolName,
    schoolPostcode,
    employerName,
    employerPostcode,
  } = formDataState;
  const filesConfig = isNotNull(studentIdPhoto)
    ? [{ title: 'Student ID Card', file: studentIdPhoto! }]
    : [
        { title: 'Student Proof Document', file: studentProofDocument! },
        { title: 'Identity Document', file: identityDocument! },
      ];

  const tableValues = [
    [
      <span>Name</span>,
      <span>{`${ticketHolderFirstName} ${ticketHolderLastName}`}</span>,
      <ChangeAnswerButton from="TicketHolderName" />,
    ],
    [
      <span>Date of birth</span>,
      <DateCell date={ticketHolderDateOfBirth!} />,
      <ChangeAnswerButton from="TicketHolderBirthDate" />,
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
      <ChangeAnswerButton from="TicketHolderAddress" />, // Or any other the other address items
    ],
    [
      <span>Photo</span>,
      <ImageCell image={ticketHolderPhoto!} />,
      <ChangeAnswerButton from="TicketHolderPhoto" />,
    ],
    [
      <span>Proof you&apos;re a student</span>,
      <FileCell filesConfig={filesConfig} />,
      <ChangeAnswerButton from="TicketHolderStudentProof" />,
    ],
    [
      <span>Are you a student or apprentice?</span>,
      <span> {isApprentice ? `Apprentice` : `Student`}</span>,
      <ChangeAnswerButton from="TicketHolderApprentice" />,
    ],
    [
      <span>
        {isApprentice ? `Employer name and postcode` : `School or College name and postcode`}
      </span>,
      <span>
        {isApprentice ? `${employerName}, ${employerPostcode}` : `${schoolName}, ${schoolPostcode}`}
      </span>,
      <ChangeAnswerButton from="TicketHolderApprentice" />,
    ],
  ];

  return (
    <Table
      title="About the ticket user"
      cellClasses={['', '', 'wmnds-text-align-right']}
      values={isStudent ? tableValues : removeNthItem(tableValues, 5)}
    />
  );
};

export default AboutTheTicketUser;
