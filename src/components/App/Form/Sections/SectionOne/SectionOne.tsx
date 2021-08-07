import { TSectionProps } from 'types/section';
import useStepLogic from '../customHooks/useStepLogic/useStepLogic';
// Steps
import TicketStartDate from './Steps/TicketStartDate';
import AddToExistingSwiftCard from './Steps/AddToExistingSwiftCard';
import AddSwiftCard from './Steps/AddSwiftCardNumber';
import CheckIfUserIsTheTicketHolder from './Steps/CheckIfUserIsTheTicketHolder';

const steps = [TicketStartDate, AddToExistingSwiftCard, AddSwiftCard, CheckIfUserIsTheTicketHolder];

const SectionOne = ({ totalSections }: TSectionProps) => {
  const { currentStep, navigation } = useStepLogic(totalSections, steps.length);
  const StepToShow = steps[currentStep - 1];

  const sectionTitle = 'About you';

  return (
    <div>
      <strong>{sectionTitle}</strong>
      <StepToShow stepNavigation={navigation} />
    </div>
  );
};

export default SectionOne;
