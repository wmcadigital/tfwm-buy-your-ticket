import { TSectionProps } from 'types/section';
import useStepLogic from '../customHooks/useStepLogic/useStepLogic';

// Steps
import TicketHolderOrPayerName from './Steps/TicketHolderOrPayerName';
import TicketHolderOrPayerBirthDate from './Steps/TicketHolderOrPayerBirthDate';
import TicketHolderOrPayerContactDetails from './Steps/TicketHolderOrPayerContactDetails';
import TicketHolderOrPayerAddress from './Steps/TicketHolderOrPayerAddress';
import TicketHolderPhoto from './Steps/TicketHolderPhoto';

const steps = [
  TicketHolderOrPayerName,
  TicketHolderOrPayerBirthDate,
  TicketHolderOrPayerContactDetails,
  TicketHolderOrPayerAddress,
  TicketHolderPhoto,
];

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
