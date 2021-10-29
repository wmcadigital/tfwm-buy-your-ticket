import { useNavigationLogic } from 'customHooks';
import { StudentProofStep } from 'components/sharedSteps';

const TicketHolderStudentProof = () => {
  const question = 'Upload proof that you’re a student';
  const { goToNextStep } = useNavigationLogic('TicketHolderPhoto', 'PayerOrTicketHolderName');

  return <StudentProofStep question={question} handleNavigation={goToNextStep} />;
};

export default TicketHolderStudentProof;
