import dompurify from 'dompurify';
// import { TForm } from 'globalState';
// Import components
import Radio from './Radio/Radio';

const { sanitize } = dompurify;

type RadiosProps = {
  name: string;
  hint?: string | JSX.Element;
  error: { message: string } | null;
  radios: { text: string; html: string | null; value: string; info: string | null }[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Radios = ({ name, hint, error, radios, onChange }: RadiosProps) => {
  return (
    <div className="wmnds-fe-group">
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          {hint && typeof hint === 'string' && <p>{hint}</p>}
          {hint && typeof hint !== 'string' && hint}s
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
              info={info}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default Radios;
