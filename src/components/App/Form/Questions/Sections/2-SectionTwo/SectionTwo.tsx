import Section from 'components/shared/Section/Section';
// Steps
import TicketHolderName from './Steps/1-TicketHolderName';
import TicketHolderBirthDate from './Steps/2-TicketHolderBirthDate';
import TicketHolderAddress from './Steps/3-TicketHolderAddress';
import TicketHolderPhoto from './Steps/4-TicketHolderPhoto';

const SectionTwo = ({ totalSections }: { totalSections: number }) => {
  return (
    <Section
      totalSections={totalSections}
      title="About the ticket user"
      steps={[TicketHolderName, TicketHolderBirthDate, TicketHolderAddress, TicketHolderPhoto]}
    />
  );
};

export default SectionTwo;
