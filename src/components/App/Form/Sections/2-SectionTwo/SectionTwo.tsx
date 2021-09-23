import { TSectionProps } from 'types/section';
import useStepLogic from 'customHooks/useStepLogic/useStepLogic';
// Steps
import TicketHolderAddress from './Steps/3-TicketHolderAddress';
import TicketHolderBirthDate from './Steps/2-TicketHolderBirthDate';
import TicketHolderName from './Steps/1-TicketHolderName';
import TicketHolderPhoto from './Steps/4-TicketHolderPhoto';

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
