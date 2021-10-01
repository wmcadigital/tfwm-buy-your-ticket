import Question from 'components/shared/Question/Question';
import FileUpload from 'components/shared/FileUpload/FileUpload';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TPhotoUploadProps } from './PhotoUpload.types';

const PhotoUploadStep = ({ handleNavigation, question }: TPhotoUploadProps) => {
  const ticketHolderPhoto = useFormDataSubscription('filename');

  const handleContinue = () => {
    if (!ticketHolderPhoto.save()) return;
    handleNavigation();
  };

  return (
    <Question
      question={question}
      handleContinue={handleContinue}
      showError={ticketHolderPhoto.hasError}
    >
      <p>We&apos;ll use this on your new ticket.</p>
      <p>This must be a clear portrait photo of your face without any filters.</p>
      <FileUpload
        label="Your photo"
        hint="Files must be jpeg or png file format"
        accept=".png, .jpg, .jpeg"
        name="ticketHolderPhoto"
        defaultValue={ticketHolderPhoto.currentValue}
        updateValue={ticketHolderPhoto.set}
        error={ticketHolderPhoto.error}
      />
    </Question>
  );
};

export default PhotoUploadStep;
