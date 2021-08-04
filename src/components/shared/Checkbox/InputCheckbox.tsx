/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

import Icon from '../Icon/Icon';

const { sanitize } = dompurify;

const InputCheckbox = ({
  fieldValidation,
  name,
  labelValue,
  labelElement,
  defaultValue,
  classes,
  errors,
}: {
  fieldValidation: () => void | null;
  name: string;
  defaultValue: string | number | readonly string[] | undefined;
  labelValue: string | null;
  labelElement: JSX.Element | null;
  errors: { name: { message: string } };
  classes: string | null;
}) => {
  // Set input to render below
  return (
    <div className={`wmnds-fe-group ${errors.name ? 'wmnds-fe-group--error' : ''} ${classes}`}>
      {errors.name && (
        <span
          className="wmnds-fe-error-message"
          dangerouslySetInnerHTML={{
            __html: sanitize(errors.name.message),
          }}
        />
      )}

      <label className="wmnds-fe-checkboxes__container">
        {labelElement !== null && labelElement}
        {!labelElement && labelValue && (
          <div
            dangerouslySetInnerHTML={{
              __html: sanitize(labelValue),
            }}
          />
        )}
        <input
          ref={fieldValidation}
          defaultValue={defaultValue}
          className="wmnds-fe-checkboxes__input"
          name={name}
          type="checkbox"
        />
        <span className="wmnds-fe-checkboxes__checkmark">
          <Icon className="wmnds-fe-checkboxes__icon" iconName="general-checkmark" />
        </span>
      </label>
    </div>
  );
};

InputCheckbox.propTypes = {
  labelValue: PropTypes.string,
  fieldValidation: PropTypes.func,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
  labelElement: PropTypes.element,
  defaultValue: PropTypes.string,
  errors: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
};

InputCheckbox.defaultProps = {
  labelValue: null,
  labelElement: null,
  fieldValidation: null,
  classes: null,
  errors: null,
  defaultValue: undefined,
};

export default InputCheckbox;
