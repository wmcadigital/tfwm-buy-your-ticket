import Button from 'components/shared/Button';
import GenericError from 'components/shared/Errors/GenericError';

const Question = ({
  question,
  handleContinue,
  children,
  showError,
  isLoading = false,
}: {
  question: string;
  handleContinue: () => void;
  children: React.ReactNode;
  showError?: boolean;
  isLoading?: boolean;
}): JSX.Element => {
  return (
    <>
      {showError && <GenericError />}
      <h2 className="wmnds-m-t-lg wmnds-m-b-lg">{question}</h2>
      {children}
      <div className="wmnds-col-1">
        <Button type="button" text="Continue" onClick={handleContinue} isFetching={isLoading} />
      </div>
    </>
  );
};

export default Question;
