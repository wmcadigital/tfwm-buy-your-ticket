import { useFormDataSubscription, useNavigationLogic } from 'customHooks';
import { PhotoUploadStep } from 'components/sharedSteps';
import { useGlobalContext } from 'state/globalState';
import { TFormStep } from '../..';

const TicketHolderPhoto = () => {
  const [globalState] = useGlobalContext();
  const { isAdult, isStudent, isChild } = globalState.ticket.raw;

  const nextStep: TFormStep = (() => {
    if (isAdult) return 'PayerOrTicketHolderName';
    if (isStudent) return 'TicketHolderStudentProof';
    if (isChild) return 'TicketHolderApprentice';
    return 'PayerOrTicketHolderName';
  })();

  const { goToNextStep } = useNavigationLogic('TicketHolderAddress', nextStep);

  const ticketHolderFirstName = useFormDataSubscription('ticketHolderFirstName');

  return (
    <PhotoUploadStep
      handleNavigation={goToNextStep}
      question={`Upload a photo of ${ticketHolderFirstName.currentValue}`}
    />
  );
};

export default TicketHolderPhoto;
