import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import InsetText from '../InsetText/InsetText';
import { TDatePickerProps } from './DatePicker.types';

// Import styles
import 'react-datepicker/dist/react-datepicker.css';
// Import Custom CSS for the date picker.
import './datePicker.scss';

const DatePickerInput = ({
  startDate,
  setStartDate,
  availableDates,
  inline = true,
}: TDatePickerProps) => {
  const minDate: Date = availableDates[0];
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = (date: Date) => {
    setIsOpen(!isOpen);
    setStartDate(date);
  };

  const options: {
    weekday: 'long' | 'short' | 'narrow' | undefined;
    month: 'long' | 'short' | 'narrow' | undefined;
    day: 'numeric' | undefined;
  } = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);

  return (
    <>
      <div className="wmnds-fe-group">
        <p>
          The soonest your new ticket can start is {dateTimeFormat.format(minDate)}. This is to give
          your bank enough time to set up the Direct Debit.
        </p>
        <label className="wmnds-fe-label" htmlFor="date">
          For example, {`${minDate.getDate()}/${minDate.getMonth() + 1}/${minDate.getFullYear()}`}
        </label>
        <input
          onFocus={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          className="wmnds-fe-input wmnds-fe-input-datepicker"
          id="date"
          inputMode="text"
          name="date"
          type="text"
          value={`${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`}
          onClick={handleClick}
        />
        {isOpen && (
          <DatePicker
            dateFormat="dd/MM/yyyy"
            onChange={handleChange}
            selected={startDate}
            calendarClassName="disruptions-date-picker"
            inline={inline}
            includeDates={[...availableDates]}
            locale="en-GB"
          />
        )}
        <InsetText
          classes="wmnds-m-t-md wmnds-m-b-md wmnds-col-1"
          content="The Direct Debit will be paid the day after your ticket starts"
        />
      </div>
    </>
  );
};

DatePickerInput.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  setStartDate: PropTypes.func,
  availableDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  inline: PropTypes.bool,
};

DatePickerInput.defaultProps = {
  inline: true,
};

export default DatePickerInput;
