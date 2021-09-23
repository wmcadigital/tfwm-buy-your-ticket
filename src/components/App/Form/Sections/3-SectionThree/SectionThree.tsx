import { TSectionProps } from 'types/section';
import { useFormDataContext } from 'state/formDataState/context';
import useStepLogic from 'customHooks/useStepLogic/useStepLogic';

// Steps
import PayerOrTicketHolderBirthDate from './Steps/2-PayerOrTicketHolderBirthDate';
import PayerOrTicketHolderName from './Steps/1-PayerOrTicketHolderName';
import PayerOrTicketHolderContactDetails from './Steps/3-PayerOrTicketHolderContactDetails';
import PayerOrTicketHolderAddress from './Steps/4-PayerOrTicketHolderAddress';
import PayerOrTicketHolderPhoto from './Steps/5-PayerOrTicketHolderPhoto';

const steps = [
  PayerOrTicketHolderName,
  PayerOrTicketHolderBirthDate,
  PayerOrTicketHolderContactDetails,
  PayerOrTicketHolderAddress,
  PayerOrTicketHolderPhoto,
];

const SectionThree = ({ totalSections }: TSectionProps) => {
  const { currentSection, currentStep, navigation } = useStepLogic(totalSections, steps.length);
  const StepToShow = steps[currentStep - 1];

  const [formDataState] = useFormDataContext();
  const { applicationForMe } = formDataState;

  const sectionTitle = applicationForMe ? 'About you' : 'About the payer'; // or 'About the payer'

  return (
    <div>
      <strong>{sectionTitle}</strong>
      <StepToShow stepNavigation={navigation} currentSection={currentSection} />
    </div>
  );
};

export default SectionThree;
