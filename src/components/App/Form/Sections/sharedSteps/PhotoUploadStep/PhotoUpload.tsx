import Question from 'components/shared/Question/Question';
import FileUpload from 'components/shared/FileUpload/FileUpload';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TPhotoUploadProps } from './PhotoUpload.types';

const PhotoUploadStep = ({ handleNavigation, question }: TPhotoUploadProps) => {
  const ticketHolderPhoto = useFormDataSubscription('filename');

  const handleContinue = () => {
    ticketHolderPhoto.save();
    handleNavigation();
  };

  return (
    <Question question={question} handleContinue={handleContinue}>
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
    </Question>
  );
};

export default PhotoUploadStep;
