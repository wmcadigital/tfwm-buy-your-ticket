import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import FileUpload from 'components/shared/FileUpload/FileUpload';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const TicketHolderPhoto = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;

  const ticketHolderPhoto = useFormDataSubscription('filename');

  const handleContinue = () => {
    ticketHolderPhoto.save();
    goToNextStep();
  };

  return (
    <QuestionCard question="Upload a photo" handleContinue={handleContinue}>
      <p>We&apos;ll use this on your new ticket.</p>
      <p>This must be a clear portrait photo of your face without any filters.</p>
      <FileUpload
        label="Your photo"
        hint="Files must be jpeg or png file format"
        name="ticketHolderPhoto"
        defaultValue={ticketHolderPhoto.value}
        accept=".png, .jpg, .jpeg"
        updateValue={(file: string) => ticketHolderPhoto.set(file)}
      />
    </QuestionCard>
  );
};

export default TicketHolderPhoto;
