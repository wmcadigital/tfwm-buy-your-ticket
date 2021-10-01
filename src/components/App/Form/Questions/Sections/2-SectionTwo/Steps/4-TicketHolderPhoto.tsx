import { PhotoUploadStep } from 'components/sharedSteps';
import useNavigationLogic from 'customHooks/useNavigationLogic/useNavigationLogic';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

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
