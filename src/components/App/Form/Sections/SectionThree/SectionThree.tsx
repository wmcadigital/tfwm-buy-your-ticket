import { TSectionProps } from 'types/section';
import useStepLogic from '../customHooks/useStepLogic/useStepLogic';

// Steps
import PayerBirthDate from './Steps/PayerBirthDate';
import PayerName from './Steps/PayerName';
import PayerContactDetails from './Steps/PayerContactDetails';
import PayerAddress from './Steps/PayerAddress';
import PayerPhoto from './Steps/PayerPhoto';

const steps = [PayerName, PayerBirthDate, PayerContactDetails, PayerAddress, PayerPhoto];

const SectionThree = ({ totalSections }: TSectionProps) => {
  const { currentSection, currentStep, navigation } = useStepLogic(totalSections, steps.length);
  const StepToShow = steps[currentStep - 1];

  const sectionTitle = 'About the ticket'; // or 'About the payer'

  return (
    <div>
      <strong>{sectionTitle}</strong>
      <StepToShow stepNavigation={navigation} currentSection={currentSection} />
    </div>
  );
};

export default SectionThree;
