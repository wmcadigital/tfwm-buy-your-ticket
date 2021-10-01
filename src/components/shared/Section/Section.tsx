import { useGlobalContext } from 'state/globalState/context';
import { TSectionProps } from './Section.types';

const Section = ({ totalSections, title, steps }: TSectionProps) => {
  const [globalState] = useGlobalContext();
  const { currentSection, currentStep } = globalState.form;

  const StepToShow = steps[currentStep - 1];

  return (
    <div>
      <p className="wmnds-m-b-none">{`Section ${currentSection} of ${totalSections}`}</p>
      <strong>{title}</strong>
      <StepToShow />
    </div>
  );
};

export default Section;
