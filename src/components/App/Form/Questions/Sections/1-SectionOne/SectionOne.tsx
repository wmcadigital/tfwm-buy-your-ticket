import { Section } from 'components/shared';
import { TSectionProps, sectionPropTypes } from 'types/section';
// Steps
import TicketStartDate from './Steps/1-TicketStartDate';
import AddToExistingSwiftCard from './Steps/2-AddToExistingSwiftCard';
import AddSwiftCard from './Steps/3-AddSwiftCardNumber';
import CheckIfUserIsTheTicketHolder from './Steps/4-CheckIfUserIsTheTicketHolder';

const SectionOne = ({ totalSections }: TSectionProps) => {
  return (
    <Section
      totalSections={totalSections}
      title="About the ticket"
      steps={[TicketStartDate, AddToExistingSwiftCard, AddSwiftCard, CheckIfUserIsTheTicketHolder]}
    />
  );
};

SectionOne.propTypes = sectionPropTypes;

export default SectionOne;
