import { Section } from 'components/shared';
import { TSectionProps, sectionPropTypes } from 'types/section';
// Steps
import TicketHolderName from './Steps/1-TicketHolderName';
import TicketHolderBirthDate from './Steps/2-TicketHolderBirthDate';
import TicketHolderAddress from './Steps/3-TicketHolderAddress';
import TicketHolderPhoto from './Steps/4-TicketHolderPhoto';

const SectionTwo = ({ totalSections }: TSectionProps) => {
  return (
    <Section
      totalSections={totalSections}
      title="About the ticket user"
      steps={[TicketHolderName, TicketHolderBirthDate, TicketHolderAddress, TicketHolderPhoto]}
    />
  );
};

SectionTwo.propTypes = sectionPropTypes;

export default SectionTwo;
