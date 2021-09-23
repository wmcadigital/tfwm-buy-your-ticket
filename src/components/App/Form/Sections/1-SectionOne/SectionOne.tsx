import { TSectionProps } from 'types/section';
import useStepLogic from 'customHooks/useStepLogic/useStepLogic';
// Steps
import TicketStartDate from './Steps/1-TicketStartDate';
import AddToExistingSwiftCard from './Steps/3-AddToExistingSwiftCard';
import AddSwiftCard from './Steps/2-AddSwiftCardNumber';
import CheckIfUserIsTheTicketHolder from './Steps/4-CheckIfUserIsTheTicketHolder';

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
