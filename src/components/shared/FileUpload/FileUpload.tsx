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
  label,
  hint,
  defaultValue,
  updateValue,
  accept,
}: {
  name: string;
  fieldValidation: () => void | null;
  errors: { name: { message: string } };
  label?: string;
  hint?: string;
  defaultValue?: string | null;
  updateValue?: (file: string) => void;
  accept?: string;
}): JSX.Element => {
  // Local state for controlling file upload
  const [isFileInputFocused, setIsFileInputFocused] = useState(false); // This is used to emulate the input focus class on the label
  const [uploadedFile, setUploadedFile] = useState<string | null>(defaultValue || null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el: HTMLInputElement = e.target;
    const filesList: FileList | null = el ? el.files : null;
    const file: File | null = filesList ? filesList[0] : null;

    // If a file exists (user hasn't clicked cancel button or something)
    if (file) {
      const f = URL.createObjectURL(file);
      setUploadedFile(f);
      if (updateValue) updateValue(f);
    }
  };

  // HandleFocus (when user joins input)
  const handleFocus = () => setIsFileInputFocused(true);

  // Handleblur (when user leaves input), set input to unfocus
  const handleBlur = () => setIsFileInputFocused(false);

  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <p>
          <strong>{label}</strong>
        </p>
        <p>{hint}</p>
      </legend>
      <div className={`wmnds-fe-group ${errors ? 'wmnds-fe-group--error' : ''}`}>
        {/* If there is an error, show here */}
        {errors && <span className="wmnds-fe-error-message">{errors?.name?.message}</span>}

        {uploadedFile ? (
          <>
            <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName="general-trash" />
            <button
              className="wmnds-btn wmnds-btn--destructive"
              type="button"
              name={name}
              id={name}
              title="Remove uploaded file"
              onClick={() => setUploadedFile(null)}
            >
              Remove file
              <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName="general-trash" />
            </button>
            <div className="wmnds-m-t-lg">
              <img className={s.fileUploadPreview} src={uploadedFile} alt="preview" />
            </div>
          </>
        ) : (
          <>
            <label
              htmlFor={name}
              className={`wmnds-btn wmnds-btn--primary ${
                isFileInputFocused ? s.fileUploadLabelFocused : ''
              }`}
            >
              Choose file
              <Icon
                className="wmnds-btn__icon wmnds-btn__icon--right"
                iconName="general-paperclip"
              />
              <input
                type="file"
                name={name}
                id={name}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleChange}
                className={s.fileUpload}
                ref={fieldValidation}
                accept={accept}
              />
            </label>
            <span className="wmnds-m-l-md">No file selected</span>
          </>
        )}
      </div>
    </fieldset>
  );
};

FileUpload.propTypes = {
  name: PropTypes.string.isRequired,
  fieldValidation: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
  label: PropTypes.string,
  hint: PropTypes.string,
  updateValue: PropTypes.func,
  defaultValue: PropTypes.string,
  accept: PropTypes.string,
};

FileUpload.defaultProps = {
  fieldValidation: null,
  errors: null,
  label: null,
  hint: null,
  updateValue: null,
  defaultValue: null,
  accept: null,
};

export default FileUpload;
