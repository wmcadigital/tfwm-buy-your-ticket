import { PhotoUploadStep } from 'components/sharedSteps';
import useNavigationLogic from 'customHooks/useNavigationLogic/useNavigationLogic';

const PayerPhoto = () => {
  const { goToNextStep } = useNavigationLogic('PayerOrTicketHolderAddress', 'InstructionsToBank');

  return <PhotoUploadStep handleNavigation={goToNextStep} question="Upload a photo" />;
};

export default PayerPhoto;
