import { useCallback } from 'react';
import Question from 'components/shared/Question/Question';
import FileUpload from 'components/shared/FileUpload/FileUpload';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import useStoreSessionPhotos from 'customHooks/axiosRequests/useStoreSessionPhoto/useStoreSessionPhoto';
import { TPhotoUploadProps } from './PhotoUpload.types';

const PhotoUploadStep = ({ handleNavigation, question }: TPhotoUploadProps) => {
  const file = useFormDataSubscription('file');
  const filename = useFormDataSubscription('filename');
  const storeSessionPhotos = useStoreSessionPhotos(file.currentValue);

  const handleUpdateFile = (newFile: File | null) => {
    if (newFile === null) {
      file.set(null);
      filename.set(null);
    } else {
      file.set(newFile);
      filename.set(newFile.name);
    }
  };

  const handleContinue = useCallback(async () => {
    const isFileValid = file.save();
    const isFilenameValid = filename.save();
    if (!isFileValid || !isFilenameValid) return;
    const response = await storeSessionPhotos.sendRequest();
    if (!response?.data[0].photo) return;
    handleNavigation();
  }, [file, filename, handleNavigation, storeSessionPhotos]);

  return (
    <Question
      question={question}
      handleContinue={handleContinue}
      showError={filename.hasError || file.hasError || storeSessionPhotos.hasError}
      isLoading={storeSessionPhotos.isLoading}
    >
      <p>We&apos;ll use this on your new ticket.</p>
      <p>This must be a clear portrait photo of your face without any filters.</p>
      <FileUpload
        label="Your photo"
        hint="Files must be jpeg or png file format"
        accept=".png, .jpg, .jpeg"
        name="ticketHolderPhoto"
        defaultFile={file.currentValue}
        updateFile={handleUpdateFile}
        error={file.error}
      />
    </Question>
  );
};

export default PhotoUploadStep;
