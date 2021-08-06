import { TSectionProps } from 'types/section';
import useStepLogic from '../customHooks/useStepLogic/useStepLogic';

// Steps
import TicketHolderOrPayerName from '../SectionThree/Steps/TicketHolderOrPayerName';
import TicketHolderOrPayerBirthDate from '../SectionThree/Steps/TicketHolderOrPayerBirthDate';
import TicketHolderOrPayerAddress from '../SectionThree/Steps/TicketHolderOrPayerAddress';
import TicketHolderPhoto from '../SectionThree/Steps/TicketHolderPhoto';
import TicketHolderOrPayerManualAddress from '../SectionThree/Steps/TicketHolderOrPayerManualAddress';

const steps = [
  TicketHolderOrPayerName,
  TicketHolderOrPayerBirthDate,
  TicketHolderOrPayerAddress,
  TicketHolderOrPayerManualAddress,
  TicketHolderPhoto,
];

const SectionTwo = ({ totalSections }: TSectionProps) => {
  const { currentSection, currentStep, navigation } = useStepLogic(totalSections, steps.length);
  const StepToShow = steps[currentStep - 1];

  const sectionTitle = 'About the ticket user';

  return (
    <div>
      <strong>{sectionTitle}</strong>
      <StepToShow stepNavigation={navigation} currentSection={currentSection} />
    </div>
  );
};

export default SectionTwo;
