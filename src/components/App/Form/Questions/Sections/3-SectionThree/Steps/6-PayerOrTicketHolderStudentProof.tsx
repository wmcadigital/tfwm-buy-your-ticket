import { useNavigationLogic } from 'customHooks';
import { StudentProofStep } from 'components/sharedSteps';

const PayerOrTicketHolderStudentProof = () => {
  const question = 'Upload proof that you’re a student';
  const { goToNextStep } = useNavigationLogic('PayerOrTicketHolderPhoto', 'InstructionsToBank');

  return <StudentProofStep question={question} handleNavigation={goToNextStep} />;
};

export default PayerOrTicketHolderStudentProof;
