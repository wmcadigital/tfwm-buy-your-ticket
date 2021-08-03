import PropTypes from 'prop-types';

const DateInput = ({
  autoComplete,
  dateType,
  defaultValue,
  fieldValidation,
  onChange,
  name,
  errors,
}: {
  autoComplete: string;
  dateType: 'Day' | 'Month' | 'Year';
  defaultValue: number;
  fieldValidation: () => void | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  errors: { name: { message: string } } | null;
}): JSX.Element => {
  const inputName = name + dateType;

  return (
    <>
      <label className="wmnds-fe-label" htmlFor={inputName}>
        {dateType}
      </label>
      <input
        autoComplete={autoComplete}
        className={`wmnds-fe-input ${errors?.name ? 'wmnds-fe-input--error' : ''}`}
        defaultValue={defaultValue}
        id={inputName}
        inputMode="numeric"
        onChange={onChange}
        name={inputName}
        ref={fieldValidation}
        type="text"
      />
    </>
  );
};

DateInput.propTypes = {
  autoComplete: PropTypes.string,
  dateType: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  fieldValidation: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
};

DateInput.defaultProps = {
  autoComplete: null,
  defaultValue: '',
  fieldValidation: null,
  errors: null,
};

export default DateInput;
