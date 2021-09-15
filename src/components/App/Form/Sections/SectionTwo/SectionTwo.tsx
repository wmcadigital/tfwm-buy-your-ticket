import { TSectionProps } from 'types/section';
import useStepLogic from 'customHooks/useStepLogic/useStepLogic';
// Steps
import TicketHolderAddress from './Steps/TicketHolderAddress';
import TicketHolderBirthDate from './Steps/TicketHolderBirthDate';
import TicketHolderName from './Steps/TicketHolderName';
import TicketHolderPhoto from './Steps/TicketHolderPhoto';

const steps = [TicketHolderName, TicketHolderBirthDate, TicketHolderAddress, TicketHolderPhoto];

const SectionTwo = ({ totalSections }: TSectionProps) => {
  const { currentStep, navigation } = useStepLogic(totalSections, steps.length);
  const StepToShow = steps[currentStep - 1];

  const sectionTitle = 'About the ticket user';

  return (
    <div>
      <strong>{sectionTitle}</strong>
      <StepToShow stepNavigation={navigation} />
    </div>
  );
};

export default SectionTwo;
