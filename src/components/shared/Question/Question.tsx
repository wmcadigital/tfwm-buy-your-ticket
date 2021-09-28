import Button from 'components/shared/Button';
import GenericError from 'components/shared/Errors/GenericError';
import { TQuestionProps } from './Question.types';

const Question = ({
  question,
  handleContinue,
  children,
  showError,
  isLoading = false,
}: TQuestionProps) => {
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
