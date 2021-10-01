import Section from 'components/shared/Section/Section';
// Steps
import TicketStartDate from './Steps/1-TicketStartDate';
import AddToExistingSwiftCard from './Steps/2-AddToExistingSwiftCard';
import AddSwiftCard from './Steps/3-AddSwiftCardNumber';
import CheckIfUserIsTheTicketHolder from './Steps/4-CheckIfUserIsTheTicketHolder';

const SectionOne = ({ totalSections }: { totalSections: number }) => {
  return (
    <Section
      totalSections={totalSections}
      title="About the ticket"
      steps={[TicketStartDate, AddToExistingSwiftCard, AddSwiftCard, CheckIfUserIsTheTicketHolder]}
    />
  );
};

export default SectionOne;
