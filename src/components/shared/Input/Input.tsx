import PropTypes from 'prop-types';
import dompurify from 'dompurify';
import InputMask from 'react-maskinput';
import { TInputProps } from './Input.types';

const { sanitize } = dompurify;

const Input = ({
  autocomplete,
  className,
  groupClassName,
  fieldValidation,
  inputmode,
  label,
  name,
  defaultValue,
  spellcheck,
  type,
  errors,
  onChange,
  pattern,
  mask,
  maskChar,
}: TInputProps) => {
  // Set input to render below
  const input = mask ? (
    <>
      <InputMask
        mask={mask}
        maskChar={maskChar}
        // autoComplete={autocomplete}
        // className={`wmnds-fe-input ${errors ? 'wmnds-fe-input--error' : ''}`}
        defaultValue={defaultValue || ''}
        // id={name}
        // inputMode={inputmode}
        // name={name}
        // ref={fieldValidation}
        // spellCheck={spellcheck}
        // type={type}
        onChange={onChange}
        // onBlur={() => onBlur(true)}
      />
    </>
  ) : (
    <input
      autoComplete={autocomplete}
      className={`wmnds-fe-input ${errors ? 'wmnds-fe-input--error' : ''}`}
      defaultValue={defaultValue || ''}
      id={name}
      inputMode={inputmode}
      name={name}
      ref={fieldValidation}
      spellCheck={spellcheck}
      type={type}
      onChange={onChange}
      pattern={pattern}
    />
  );
  return (
    <div
      className={`wmnds-fe-group ${groupClassName} ${errors?.name ? 'wmnds-fe-group--error' : ''}`}
    >
      {label && typeof label === 'string' && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
          className="wmnds-fe-label"
          htmlFor={name}
          dangerouslySetInnerHTML={{ __html: sanitize(label) }}
        />
      )}
      {label && typeof label !== 'string' && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className="wmnds-fe-label" htmlFor={name}>
          {label}
        </label>
      )}
      {/* to be tested */}
      {errors?.name?.message && typeof errors.name.message === 'string' && (
        <span
          className="wmnds-fe-error-message"
          dangerouslySetInnerHTML={{ __html: sanitize(errors.name.message) }}
        />
      )}

      {mask && (
        <input
          id={name}
          name={name}
          ref={fieldValidation}
          value={defaultValue || ''}
          type="hidden"
        />
      )}

      {/* If className then wrap just input with the className else, just show input as usual */}
      {className ? <div className={className}>{input}</div> : input}
    </div>
  );
};

Input.propTypes = {
  autocomplete: PropTypes.string,
  className: PropTypes.string,
  groupClassName: PropTypes.string,
  fieldValidation: PropTypes.func,
  inputmode: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  spellcheck: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
  mask: PropTypes.string,
  maskChar: PropTypes.string,
};

Input.defaultProps = {
  autocomplete: null,
  className: '',
  groupClassName: '',
  fieldValidation: null,
  inputmode: 'text',
  spellcheck: false,
  type: 'text',
  errors: null,
  onChange: null,
  mask: null,
  maskChar: null,
};

export default Input;
