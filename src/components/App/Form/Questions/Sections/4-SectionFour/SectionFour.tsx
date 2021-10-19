import { Section } from 'components/shared';
import { TSectionProps, sectionPropTypes } from 'types/section';
// Steps
import InstructionsToBank from './Steps/1-InstructionsToBank';
import HowDidYouFindOutAboutDD from './Steps/2-HowDidYouFindOutAboutDD';

const SectionFour = ({ totalSections }: TSectionProps) => {
  return (
    <Section
      totalSections={totalSections}
      title="Direct Debit"
      steps={[InstructionsToBank, HowDidYouFindOutAboutDD]}
    />
  );
};

SectionFour.propTypes = sectionPropTypes;

export default SectionFour;
