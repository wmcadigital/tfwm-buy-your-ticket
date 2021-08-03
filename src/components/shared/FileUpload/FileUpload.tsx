import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Import components
import Icon from '../Icon/Icon';

// Import styles
import s from './FileUpload.module.scss';

const FileUpload = ({
  name,
  fieldValidation,
  errors,
}: {
  name: string;
  fieldValidation: () => void | null;
  errors: { name: { message: string } };
}): JSX.Element => {
  // Local state for controlling file upload
  const [isFileInputFocused, setIsFileInputFocused] = useState(false); // This is used to emulate the input focus class on the label
  const [fileName, setFileName] = useState('Upload photo'); // Used to change the name of the input/label button to the users file name

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el: HTMLInputElement = e.target;
    const filesList: FileList | null = el ? el.files : null;
    const file: File | null = filesList ? filesList[0] : null;

    // If a file exists (user hasn't clicked cancel button or something)
    if (file) {
      setFileName(file.name); // Set file name that the user has chosen (this will display in our label)
    }
  };

  // HandleFocus (when user joins input)
  const handleFocus = () => {
    setIsFileInputFocused(true); // Set input to focus
  };

  // Handleblur (when user leaves input), set input to unfocus
  const handleBlur = () => setIsFileInputFocused(false);

  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <h2 className="wmnds-fe-question">Upload a photo of the front of the ripped ticket</h2>
        <p>We need to be able to read the ticket type and expiry date to process the refund</p>
        <p>The file must be a JPG, JPEG, or PNG</p>
      </legend>
      <div className={`wmnds-fe-group ${errors.name ? 'wmnds-fe-group--error' : ''}`}>
        {/* If there is an error, show here */}
        {errors.name && <span className="wmnds-fe-error-message">{errors.name.message}</span>}
        <label
          htmlFor="fileUpload"
          className={`wmnds-btn wmnds-btn--primary ${
            isFileInputFocused ? s.fileUploadLabelFocused : ''
          }`}
        >
          {fileName}
          <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName="general-paperclip" />
          <input
            type="file"
            name={name}
            id="fileUpload"
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={handleChange}
            className={s.fileUpload}
            ref={fieldValidation}
          />
        </label>
      </div>
    </fieldset>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  fieldValidation: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
};

FileUpload.defaultProps = {
  fieldValidation: null,
  errors: null,
};

export default FileUpload;
