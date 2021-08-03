import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import components
import DateInput from './DateInput.js/DateInput';

const Date = ({
  autoCompletPrefix,
  fieldValidation,
  name,
  formDataState,
  errors,
  triggerValidation,
}: {
  autoCompletPrefix: string;
  fieldValidation: () => void;
  name: string;
  formDataState: { formData: { name: string } } | null;
  errors: { name: { message: string } };
  triggerValidation: () => void; // check if this is still needed
}) => {
  const [stateYear, stateMonth, stateDay] = formDataState?.formData?.name
    ? formDataState?.formData?.name.split('-')
    : ['', '', ''];

  // State used for capturing date fields onChange below (we use these to validate against below)
  const [day, setDay] = useState<number>(parseInt(stateDay, 10));
  const [month, setMonth] = useState<number>(parseInt(stateMonth, 10));
  const [year, setYear] = useState<number>(parseInt(stateYear, 10));
  const [date, setDate] = useState<string | null>(
    formDataState ? formDataState?.formData?.name : null,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el: HTMLInputElement = e.target;
    const value = parseInt(el.value, 10);

    // Switch on the input name, depending on name then update the relevant var
    switch (el.name) {
      case `${name}Day`:
        // If value is less than ten and greater than 0 (1-9) and is only 1 in length (so not 08)
        if (value < 10 && value > 0) {
          setDay(0 + value); // Then prepend a 0 to it to make it a valid day
        } else {
          setDay(value);
        }
        break;
      case `${name}Month`:
        // If value is less than ten and greater than 0 (1-9) and is only 1 in length (so not 08)
        if (value < 10 && value > 0) {
          setMonth(0 + value); // Then prepend a 0 to it to make it a valid month
        } else {
          setMonth(value);
        }
        break;
      default:
        setYear(value);
    }
  };

  useEffect(() => {
    if (year && month && day) {
      setDate(`${year}-${month}-${day}`);
    } // Set date state to current yyyy-mm-dd set by user (would do it in handleChange event but it falls out of sync)
  }, [day, month, year, setDate]);

  // Trigger validation every time date has been updated
  useEffect(() => {
    if (date) triggerValidation();
  }, [date, triggerValidation]);

  return (
    <>
      {/* If there is an error, show here */}
      {errors?.name && <span className="wmnds-fe-error-message">{errors.name.message}</span>}

      <div className={`wmnds-fe-group ${errors.name ? 'wmnds-fe-group--error' : ''}`}>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-12 wmnds-m-r-md">
          <DateInput
            autoComplete={autoCompletPrefix ? `${autoCompletPrefix}day` : 'day'}
            dateType="Day"
            defaultValue={day}
            name={name}
            onChange={handleChange}
          />
        </div>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-12 wmnds-m-r-md">
          <DateInput
            autoComplete={autoCompletPrefix ? `${autoCompletPrefix}month` : 'month'}
            dateType="Month"
            defaultValue={month}
            name={name}
            onChange={handleChange}
          />
        </div>
        <div className="wmnds-col-1-2 wmnds-col-sm-1-8">
          <DateInput
            autoComplete={autoCompletPrefix ? `${autoCompletPrefix}year` : 'year'}
            dateType="Year"
            defaultValue={year}
            name={name}
            onChange={handleChange}
          />
        </div>
      </div>
      <input name={name} type="hidden" ref={fieldValidation} value={date || ''} />
    </>
  );
};

Date.propTypes = {
  autoCompletPrefix: PropTypes.string,
  fieldValidation: PropTypes.func,
  name: PropTypes.string.isRequired,
  triggerValidation: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
  formDataState: PropTypes.objectOf(PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))),
};

Date.defaultProps = {
  autoCompletPrefix: '',
  fieldValidation: null,
  formDataState: null,
  triggerValidation: null,
  errors: null,
};

export default Date;
