import { useGlobalContext } from 'state/globalState/context';
import BackButton from './BackButton/BackButton';
import s from './Form.module.scss';
// Sections
import SectionOne from './Sections/SectionOne/SectionOne';
import Summary from './Summary/Summary';

const sections = [SectionOne];

const Form = () => {
  const [globalState, globalDispatch] = useGlobalContext();
  const { form } = globalState;

  const totalSections = sections.length;
  const SectionToShow = sections[form.currentSection - 1];
  const whichSectionText = `Section ${form.currentSection} of ${totalSections}`;

  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
      <div className="wmnds-col-1 wmnds-m-b-lg">
        <BackButton onClick={() => globalDispatch({ type: 'GO_BACK' })} />
      </div>
      <div className="wmnds-col-1 wmnds-col-md-3-4">
        <div className={`${s.card} bg-white wmnds-m-b-lg`}>
          {form.isFinished ? (
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
