import { useGlobalContext } from 'state/globalState/context';
import BackButton from './BackButton/BackButton';
import Summary from './Summary/Summary';
import s from './Form.module.scss';

// Sections
import SectionOne from './Sections/1-SectionOne/SectionOne';
import SectionTwo from './Sections/2-SectionTwo/SectionTwo';
import SectionThree from './Sections/3-SectionThree/SectionThree';
import SectionFour from './Sections/4-SectionFour/SectionFour';

const sections = [SectionOne, SectionTwo, SectionThree, SectionFour];

const Form = () => {
  const [globalState, globalDispatch] = useGlobalContext();
  const { form } = globalState;

  const handleBackButtonClick = () => {
    return globalDispatch({
      type: form.isEditing ? 'SHOW_SUMMARY_PAGE' : 'GO_BACK',
    });
  };

  const totalSections = sections.length;
  const SectionToShow = sections[form.currentSection - 1];
  const whichSectionText = `Section ${form.currentSection} of ${totalSections}`;

  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
      <div className="wmnds-col-1 wmnds-m-b-lg">
        <BackButton onClick={handleBackButtonClick} />
      </div>
      <div className="wmnds-col-1 wmnds-col-md-3-4">
        <div className={`${s.card} bg-white wmnds-m-b-lg`}>
          {form.isFinished && !form.isEditing ? (
            <Summary />
          ) : (
            <>
              <p className="wmnds-m-b-none">{whichSectionText}</p>
              <SectionToShow totalSections={totalSections} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
