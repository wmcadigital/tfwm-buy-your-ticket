import { StudentOrApprenticeStep } from 'components/sharedSteps';
import { useNavigationLogic } from 'customHooks';

const PayerOrTicketHolderIsApprentice = () => {
  const { goToNextStep } = useNavigationLogic('PayerOrTicketHolderPhoto', 'InstructionsToBank');

  const question = `Are you a student or apprentice?`;
  const schoolOrCollegeQuestion = `Which school or college do you go to?`;
  const employerQuestion = `Who is your employer?`;

  return (
    <StudentOrApprenticeStep
      question={question}
      handleNavigation={goToNextStep}
      schoolOrCollegeQuestion={schoolOrCollegeQuestion}
      employerQuestion={employerQuestion}
    />
  );
};

export default PayerOrTicketHolderIsApprentice;
