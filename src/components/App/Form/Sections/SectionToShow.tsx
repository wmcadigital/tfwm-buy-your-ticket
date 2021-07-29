import QuestionCard from 'components/shared/QuestionCard';
import { useGlobalContext } from 'state/globalState/context';

const sections = ['a', 'b', 'b', 'c'];

const SectionToShow = () => {
  const [globalState] = useGlobalContext();
  const { currentSection } = globalState.form;
  const totalSections = sections.length;

  return (
    <QuestionCard handleContinue={() => {}}>
      <p className="wmnds-m-b-lg">
        Section {currentSection} of {totalSections}
        <br />
        <strong>Section title</strong>
      </p>
    </QuestionCard>
  );
};

export default SectionToShow;
