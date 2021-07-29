import PropTypes from 'prop-types';
import Button from 'components/shared/Button';
import { TQuestionCardProps } from './QuestionCard.types';
import s from './QuestionCard.module.scss';

const QuestionCard = ({ children, handleContinue }: TQuestionCardProps) => {
  return (
    <div className={`${s.card} bg-white wmnds-m-b-lg`}>
      {children}
      <Button btnClass="wmnds-col-1 wmnds-col-sm-auto" text="Continue" onClick={handleContinue} />
      {/* {showChangeBtn && (
        <div className="wmnds-hide-desktop wmnds-p-t-md">
          <ChangeAnswers />
        </div>
      )} */}
    </div>
  );
};

QuestionCard.propTypes = {
  handleContinue: PropTypes.func.isRequired,
};

export default QuestionCard;
