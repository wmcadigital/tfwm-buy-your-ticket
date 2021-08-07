import Button from 'components/shared/Button';

const QuestionCard = ({
  question,
  handleContinue,
  children,
}: {
  question: string;
  handleContinue: () => void;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      <h2 className="wmnds-m-t-lg wmnds-m-b-lg">{question}</h2>
      {children}
      <div className="wmnds-col-1">
        <Button type="button" text="Continue" onClick={handleContinue} />
      </div>
    </>
  );
};

export default QuestionCard;
