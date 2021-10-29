import { useFormDataContext } from 'state/formDataState/context';
import { Section } from 'components/shared';
import { TSectionProps, sectionPropTypes } from 'types/section';
// Steps
import PayerOrTicketHolderName from './Steps/1-PayerOrTicketHolderName';
import PayerOrTicketHolderBirthDate from './Steps/2-PayerOrTicketHolderBirthDate';
import PayerOrTicketHolderContactDetails from './Steps/3-PayerOrTicketHolderContactDetails';
import PayerOrTicketHolderAddress from './Steps/4-PayerOrTicketHolderAddress';
import PayerOrTicketHolderPhoto from './Steps/5-PayerOrTicketHolderPhoto';
import PayerOrTicketHolderStudentProof from './Steps/6-PayerOrTicketHolderStudentProof';
import PayerOrTicketHolderIsApprentice from './Steps/7-PayerOrTicketHolderApprentice';

const SectionThree = ({ totalSections }: TSectionProps) => {
  const [formDataState] = useFormDataContext();
  const { applicationForMe } = formDataState;

  const title = applicationForMe ? 'About you' : 'About the payer';

  return (
    <Section
      totalSections={totalSections}
      title={title}
      steps={[
        PayerOrTicketHolderName,
        PayerOrTicketHolderBirthDate,
        PayerOrTicketHolderContactDetails,
        PayerOrTicketHolderAddress,
        PayerOrTicketHolderPhoto,
        PayerOrTicketHolderStudentProof,
        PayerOrTicketHolderIsApprentice,
      ]}
    />
  );
};

SectionThree.propTypes = sectionPropTypes;

export default SectionThree;
