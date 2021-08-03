import PropTypes from 'prop-types';

const InsetText = ({
  content,
  classes,
}: {
  content: JSX.Element | string;
  classes: string;
}): JSX.Element => <div className={`wmnds-inset-text ${classes}`}>{content}</div>;

InsetText.propTypes = {
  content: PropTypes.string.isRequired,
  classes: PropTypes.string,
};
InsetText.defaultProps = {
  classes: null,
};

export default InsetText;
