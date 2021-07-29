import BackButton from './BackButton/BackButton';
import SectionToShow from './Sections/SectionToShow';

const Form = () => {
  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
      <div className="wmnds-col-1 wmnds-m-b-lg">
        <BackButton />
      </div>
      <div className="wmnds-col-1 wmnds-col-md-3-4">
        <SectionToShow />
      </div>
    </div>
  );
};

export default Form;
