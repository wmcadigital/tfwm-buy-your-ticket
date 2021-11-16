import { Section } from 'components/shared';
import { TSectionProps, sectionPropTypes } from 'types/section';
// Steps
import OutOfCounty from './Steps/1-OutOfCounty';
import TicketStartDate from './Steps/2-TicketStartDate';
import AddToExistingSwiftCard from './Steps/3-AddToExistingSwiftCard';
import AddSwiftCard from './Steps/4-AddSwiftCardNumber';
import CheckIfUserIsTheTicketHolder from './Steps/5-CheckIfUserIsTheTicketHolder';

const SectionOne = ({ totalSections }: TSectionProps) => {
  return (
    <Section
      totalSections={totalSections}
      title="About the ticket"
      steps={[
        OutOfCounty,
        TicketStartDate,
        AddToExistingSwiftCard,
        AddSwiftCard,
        CheckIfUserIsTheTicketHolder,
      ]}
    />
  );
};

SectionOne.propTypes = sectionPropTypes;

export default SectionOne;
