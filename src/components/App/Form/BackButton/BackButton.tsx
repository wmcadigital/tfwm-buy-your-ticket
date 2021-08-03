import { TBackButtonProps } from './BackButton.types';

const BackButton = ({ onClick }: TBackButtonProps) => {
  return (
    <button className="wmnds-btn wmnds-btn--link" type="button" onClick={onClick}>
      <span>&lt; Back</span>
    </button>
  );
};

export default BackButton;
