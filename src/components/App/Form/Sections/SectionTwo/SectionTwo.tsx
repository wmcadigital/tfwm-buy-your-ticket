import { TSectionProps } from 'types/section';
import useStepLogic from '../customHooks/useStepLogic/useStepLogic';

// Steps
import TicketHolderOrPayerName from '../SectionThree/Steps/TicketHolderOrPayerName';
import TicketHolderOrPayerBirthDate from '../SectionThree/Steps/TicketHolderOrPayerBirthDate';
import TicketHolderOrPayerContactDetails from '../SectionThree/Steps/TicketHolderOrPayerContactDetails';
import TicketHolderOrPayerAddress from '../SectionThree/Steps/TicketHolderOrPayerAddress';
import TicketHolderPhoto from '../SectionThree/Steps/TicketHolderPhoto';

const steps = [
  TicketHolderOrPayerName,
  TicketHolderOrPayerBirthDate,
  TicketHolderOrPayerContactDetails,
  TicketHolderOrPayerAddress,
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
