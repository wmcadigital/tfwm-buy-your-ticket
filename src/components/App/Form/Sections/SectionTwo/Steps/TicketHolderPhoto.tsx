import { TStepProps } from 'types/step';
import { useFormDataContext } from 'state/formDataState/context';
import { PhotoUploadStep } from '../../sharedSteps';

const TicketHolderPhoto = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;
  const [formDataState] = useFormDataContext();
  const { ticketHolderFirstName } = formDataState;

  return (
    <PhotoUploadStep
      handleNavigation={goToNextStep}
      question={`Upload a photo of ${ticketHolderFirstName.value}`}
    />
  );
};

export default TicketHolderPhoto;
