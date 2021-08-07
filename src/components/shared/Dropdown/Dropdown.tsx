/* eslint-disable jsx-a11y/no-onchange */
import dompurify from 'dompurify';
// Import contexts
// import { useFormContext, TForm } from 'globalState';
import React from 'react';

const { sanitize } = dompurify;

type DropdownProps = {
  name: string;
  hint?: string;
  error?: { message: string } | null;
  className?: string;
  label: string;
  defaultValue?: string | null;
  options: { text: string; value: string }[];
  onChange?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
};

const Dropdown = ({
  name,
  hint,
  label,
  error,
  className,
  options,
  defaultValue,
  onChange,
  onBlur,
}: DropdownProps) => {
  // const [formState] = useFormContext(); // Get the state/dispatch of form data from FormContext
  // const defaultSelectValue = defaultValue || (formState.ticketInfo[name] as string | number); // cast to acceptable types for a select element
  const defaultSelectValue = defaultValue;
  return (
    <div className={`wmnds-fe-group wmnds-m-b-md ${className}`}>
      <fieldset className="wmnds-fe-fieldset">
        <p>{hint}</p>
        <div className={`wmnds-fe-dropdown${error ? ' wmnds-fe-group--error' : ''}`}>
          {/* If there is an error, show here */}
          {error && (
            <span
              className="wmnds-fe-error-message"
              dangerouslySetInnerHTML={{
                __html: sanitize(error.message),
              }}
            />
          )}
          <label className="wmnds-fe-label" htmlFor={name}>
            {label}
          </label>
          <select
            className="wmnds-fe-dropdown__select"
            id={name}
            name={name}
            defaultValue={defaultSelectValue || ''}
            onChange={onChange}
            onBlur={onBlur}
          >
            <option value="">Choose from list</option>
            {options.map((option) => (
              <option
                key={option.text}
                value={option.value}
                selected={option.value === defaultSelectValue}
              >
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
    </div>
  );
};

export default Dropdown;
