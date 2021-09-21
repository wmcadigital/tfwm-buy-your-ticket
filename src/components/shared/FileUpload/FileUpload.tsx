import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';
import s from './FileUpload.module.scss';
import { TFileUploadProps } from './FileUpload.types';

const FileUpload = ({
  name,
  label,
  hint,
  defaultValue,
  updateValue,
  error,
  accept,
}: TFileUploadProps): JSX.Element => {
  const [isFileInputFocused, setIsFileInputFocused] = useState(false); // This is used to emulate the input focus class on the label
  const handleFocus = () => setIsFileInputFocused(true);
  const handleBlur = () => setIsFileInputFocused(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target?.files;
    const file = fileList ? fileList[0] : null;

    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    updateValue(fileUrl);
  };

  return (
    <fieldset className="wmnds-fe-fieldset">
      <legend className="wmnds-fe-fieldset__legend">
        <p>
          <strong>{label}</strong>
        </p>
        <p>{hint}</p>
      </legend>
      <div className={`wmnds-fe-group ${error ? 'wmnds-fe-group--error' : ''}`}>
        {/* If there is an error, show here */}
        {error && <span className="wmnds-fe-error-message">{error?.message}</span>}

        {defaultValue ? (
          <>
            <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName="general-trash" />
            <button
              className="wmnds-btn wmnds-btn--destructive"
              type="button"
              name={name}
              id={name}
              title="Remove uploaded file"
              onClick={() => updateValue(null)}
            >
              Remove file
              <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName="general-trash" />
            </button>
            <div className="wmnds-m-t-lg">
              <img className={s.fileUploadPreview} src={defaultValue} alt="preview" />
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
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  label: PropTypes.string,
  hint: PropTypes.string,
  updateValue: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  accept: PropTypes.string,
};

FileUpload.defaultProps = {
  error: null,
  label: null,
  hint: null,
  defaultValue: null,
  accept: '*',
};

export default FileUpload;
