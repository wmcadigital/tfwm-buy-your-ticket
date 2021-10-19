import { useNavigationLogic } from 'customHooks';
import { PhotoUploadStep } from 'components/sharedSteps';

const PayerPhoto = () => {
  const { goToNextStep } = useNavigationLogic('PayerOrTicketHolderAddress', 'InstructionsToBank');

  return <PhotoUploadStep handleNavigation={goToNextStep} question="Upload a photo" />;
};

export default PayerPhoto;
