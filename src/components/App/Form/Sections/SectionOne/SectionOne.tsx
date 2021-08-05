import { TSectionProps } from 'types/section';
import useStepLogic from '../customHooks/useStepLogic/useStepLogic';
// Steps
import AddToExistingSwiftCard from './Steps/AddToExistingSwiftCard';
import TicketStartDate from './Steps/TicketStartDate';

const steps = [TicketStartDate, AddToExistingSwiftCard];

const SectionOne = ({ totalSections }: TSectionProps) => {
  const { currentStep, navigation } = useStepLogic(totalSections, steps.length);
  const StepToShow = steps[currentStep - 1];

  const sectionTitle = 'About the ticket';

  return (
    <div>
      <strong>{sectionTitle}</strong>
      <StepToShow stepNavigation={navigation} />
    </div>
  );
};

export default SectionOne;
