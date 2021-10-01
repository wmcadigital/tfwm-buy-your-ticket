import Section from 'components/shared/Section/Section';
// Steps
import InstructionsToBank from './Steps/1-InstructionsToBank';
import HowDidYouFindOutAboutDD from './Steps/2-HowDidYouFindOutAboutDD';

const SectionFour = ({ totalSections }: { totalSections: number }) => {
  return (
    <Section
      totalSections={totalSections}
      title="Direct Debit"
      steps={[InstructionsToBank, HowDidYouFindOutAboutDD]}
    />
  );
};

export default SectionFour;
