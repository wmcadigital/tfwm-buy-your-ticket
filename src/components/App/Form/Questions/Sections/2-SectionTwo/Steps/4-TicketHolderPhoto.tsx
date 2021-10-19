import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { PhotoUploadStep } from 'components/sharedSteps';

const TicketHolderPhoto = () => {
  const { goToNextStep } = useNavigationLogic('TicketHolderAddress', 'PayerOrTicketHolderName');
  const ticketHolderFirstName = useFormDataSubscription('ticketHolderFirstName');

  return (
    <PhotoUploadStep
      handleNavigation={goToNextStep}
      question={`Upload a photo of ${ticketHolderFirstName.currentValue}`}
    />
  );
};

export default TicketHolderPhoto;
