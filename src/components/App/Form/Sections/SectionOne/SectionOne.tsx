import { TSectionProps } from 'types/section';
import useStepLogic from '../customHooks/useStepLogic';
// Steps
import AddToExistingSwiftCard from './Steps/AddToExistingSwiftCard';
import TicketStartDate from './Steps/TicketStartDate';

const steps = [TicketStartDate, AddToExistingSwiftCard];

const SectionOne = ({ totalSections }: TSectionProps) => {
  const { currentStep, goToNextStep, goToNextSection } = useStepLogic(totalSections, steps.length);
  const StepToShow = steps[currentStep - 1];

  const sectionTitle = 'About the ticket';

  return (
    <div>
      <strong>{sectionTitle}</strong>
      <StepToShow goToNextStep={goToNextStep} goToNextSection={goToNextSection} />
    </div>
  );
};

export default SectionOne;
