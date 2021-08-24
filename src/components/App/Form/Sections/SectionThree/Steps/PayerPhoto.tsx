import { TStepProps } from 'types/step';
import { PhotoUploadStep } from '../../sharedSteps';

const PayerPhoto = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;

  return <PhotoUploadStep handleNavigation={goToNextStep} question="Upload a photo" />;
};

export default PayerPhoto;
