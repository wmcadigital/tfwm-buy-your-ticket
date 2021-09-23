import { TSectionProps } from 'types/section';
import useStepLogic from 'customHooks/useStepLogic/useStepLogic';

// Steps
import InstructionsToBank from './Steps/1-InstructionsToBank';
import HowDidYouFindOutAboutDD from './Steps/2-HowDidYouFindOutAboutDD';

const steps = [InstructionsToBank, HowDidYouFindOutAboutDD];

const SectionFour = ({ totalSections }: TSectionProps) => {
  const { currentStep, navigation } = useStepLogic(totalSections, steps.length);
  const StepToShow = steps[currentStep - 1];

  const sectionTitle = 'Direct Debit';

  return (
    <div>
      <strong>{sectionTitle}</strong>
      <StepToShow stepNavigation={navigation} />
    </div>
  );
};

export default SectionFour;
