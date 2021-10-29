import { StudentOrApprenticeStep } from 'components/sharedSteps';
import { useFormDataSubscription, useNavigationLogic } from 'customHooks';

const TicketHolderApprentice = () => {
  const ticketHolderFirstName = useFormDataSubscription('ticketHolderFirstName');

  const question = `Is ${ticketHolderFirstName.currentValue} a student or apprentice?`;
  const schoolOrCollegeQuestion = `Which school or college does ${ticketHolderFirstName.currentValue} go to?`;
  const employerQuestion = `Who is ${ticketHolderFirstName.currentValue}'s employer?`;

  const { goToNextStep } = useNavigationLogic('TicketHolderPhoto', 'PayerOrTicketHolderName');

  return (
    <StudentOrApprenticeStep
      question={question}
      handleNavigation={goToNextStep}
      schoolOrCollegeQuestion={schoolOrCollegeQuestion}
      employerQuestion={employerQuestion}
    />
  );
};

export default TicketHolderApprentice;
