import dompurify from 'dompurify';
import PropTypes from 'prop-types';
import { TRadiosProps } from './Radios.types';
import Radio from './Radio/Radio';

const { sanitize } = dompurify;

const Radios = ({ name, hint, error, radios, onChange, currentValue }: TRadiosProps) => {
  return (
    <div className="wmnds-fe-group">
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          {hint && typeof hint === 'string' && <p>{hint}</p>}
          {hint && typeof hint !== 'string' && hint}
        </legend>
        <div className={`wmnds-fe-radios${error ? ' wmnds-fe-group--error' : ''}`}>
          {/* If there is an error, show here */}
          {error && (
            <span
              className="wmnds-fe-error-message"
              dangerouslySetInnerHTML={{
                __html: sanitize(error.message),
              }}
            />
          )}
          {/* Loop through radios and display each radio button */}
          {radios.map(({ text, html, value, info }) => (
            <Radio
              key={text}
              name={name}
              text={html || text}
              value={value}
              onChange={onChange}
              checked={value === currentValue}
              info={info}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

Radios.propTypes = {
  name: PropTypes.string.isRequired,
  hint: PropTypes.node.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  currentValue: PropTypes.string,
};

Radios.defaultProps = {
  error: null,
  currentValue: null,
};

export default Radios;
