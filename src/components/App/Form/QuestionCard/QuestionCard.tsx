import Button from 'components/shared/Button';
import GenericError from 'components/shared/Errors/GenericError';

const QuestionCard = ({
  question,
  handleContinue,
  children,
  showError,
}: {
  question: string;
  handleContinue: () => void;
  children: React.ReactNode;
  showError?: boolean;
}): JSX.Element => {
  return (
    <>
      {showError && <GenericError />}
      <h2 className="wmnds-m-t-lg wmnds-m-b-lg">{question}</h2>
      {children}
      <div className="wmnds-col-1">
        <Button type="button" text="Continue" onClick={handleContinue} />
      </div>
    </>
  );
};

export default QuestionCard;
