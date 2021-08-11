import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Input from 'components/shared/Input';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { useFormDataContext } from 'state/formDataState/context';
import { TStepProps } from 'types/step';

const TicketHolderOrPayerManualAddress = ({ stepNavigation, currentSection }: TStepProps) => {
  const { goToNextStep, skipToSection } = stepNavigation;
  const [formDataState] = useFormDataContext();
  const { ticketHolderFirstName, applicationForMe } = formDataState;

  // We only want to save this step's answers into payer variables
  // when we are inside section 3 AND when aplication is for someone else,
  // otherwise we will be saving them as ticket holder information
  const ticketHolderOrPayerAddressLine1Var =
    currentSection === 3 && !applicationForMe.value
      ? 'payerCurrentAddressLine1'
      : 'ticketHolderCurrentAddressLine1';
  const addressLine1 = useFormDataSubscription(ticketHolderOrPayerAddressLine1Var);

  const ticketHolderOrPayerAddressLine2Var =
    currentSection === 3 && !applicationForMe.value
      ? 'payerCurrentAddressLine2'
      : 'ticketHolderCurrentAddressLine2';
  const addressLine2 = useFormDataSubscription(ticketHolderOrPayerAddressLine2Var);

  const ticketHolderOrPayerTownOrCityVar =
    currentSection === 3 && !applicationForMe.value
      ? 'payerCurrentAddressLine3'
      : 'ticketHolderCurrentAddressLine3';
  const townOrCity = useFormDataSubscription(ticketHolderOrPayerTownOrCityVar);

  const ticketHolderOrPayerCountyVar =
    currentSection === 3 && !applicationForMe.value
      ? 'payerCurrentAddressLine4'
      : 'ticketHolderCurrentAddressLine4';
  const county = useFormDataSubscription(ticketHolderOrPayerCountyVar);

  /*   const ticketHolderOrPayerPostCodeVar =
    currentSection === 3 && !applicationForMe.value
      ? 'payerCurrentPostcode'
      : 'ticketHolderCurrentPostcode';
  const postcode = useFormDataSubscription(ticketHolderOrPayerPostCodeVar);
 */

  let question = '';
  if (currentSection === 2) {
    // ticket for someone else and we are collecting ticket holder information (section 2)
    question = `What is ${ticketHolderFirstName.value}’s address?`;
  } else if (!applicationForMe.value) {
    // ticket for someone else and we are collecting payer information (section 3)
    question = "What is the payer's address?";
  } else {
    // ticket is for the user and we are collecting his information (ticket holder) (section 3 only)
    question = 'What is your address?';
  }

  const handleContinue = () => {
    addressLine1.save();
    addressLine2.save();
    townOrCity.save();
    county.save();
    // postcode.save();
    if (currentSection === 3 && !applicationForMe.value) skipToSection(4);
    return goToNextStep();
  };

  return (
    <QuestionCard question={question} handleContinue={handleContinue}>
      <p className="wmnds-m-b-lg">We&apos;ll send the ticket to this address.</p>
      <Input
        className="wmnds-col-1 wmnds-col-md-2-3"
        groupClassName="wmnds-m-b-sm"
        name="AddressLine1"
        inputmode="text"
        label="Building and street"
        defaultValue={addressLine1.value}
        onChange={(e) => addressLine1.set(e.target.value)}
        type="text"
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        className="wmnds-col-1 wmnds-col-md-2-3"
        name="AddressLine2"
        inputmode="text"
        label=""
        aria-label="Address Line 2"
        defaultValue={addressLine2.value}
        onChange={(e) => addressLine2.set(e.target.value)}
        type="text"
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        className="wmnds-col-1 wmnds-col-md-2-3"
        name="TownOrCity"
        inputmode="text"
        label="Town or city"
        defaultValue={townOrCity.value}
        onChange={(e) => townOrCity.set(e.target.value)}
        type="text"
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        className="wmnds-col-1 wmnds-col-md-2-3"
        name="County"
        inputmode="text"
        label="County"
        defaultValue={county.value}
        onChange={(e) => county.set(e.target.value)}
        type="text"
      />
      <Input
        groupClassName="wmnds-m-b-lg"
        className="wmnds-col-1 wmnds-col-md-2-3"
        name="postcode"
        inputmode="text"
        label="Postcode"
        // defaultValue={postcode.value}
        // onChange={(e) => postcode.set(e.target.value)}
        type="text"
      />
    </QuestionCard>
  );
};

export default TicketHolderOrPayerManualAddress;
