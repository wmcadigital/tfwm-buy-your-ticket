import { useNavigationLogic } from 'customHooks';
import { PhotoUploadStep } from 'components/sharedSteps';
import { useGlobalContext } from 'state/globalState';
import { TFormStep } from '../..';

const PayerPhoto = () => {
  const [globalState] = useGlobalContext();
  const { isAdult, isStudent, isChild } = globalState.ticket.raw;

  const nextStep: TFormStep = (() => {
    if (isAdult) return 'InstructionsToBank';
    if (isStudent) return 'PayerOrTicketHolderStudentProof';
    if (isChild) return 'PayerOrTicketHolderApprentice';
    return 'InstructionsToBank';
  })();

  const { goToNextStep } = useNavigationLogic('PayerOrTicketHolderAddress', nextStep);

  return <PhotoUploadStep handleNavigation={goToNextStep} question="Upload a photo" />;
};

export default PayerPhoto;
