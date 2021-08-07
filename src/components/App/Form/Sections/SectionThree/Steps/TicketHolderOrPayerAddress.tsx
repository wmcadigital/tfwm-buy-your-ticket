import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import Button from 'components/shared/Button';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Input from 'components/shared/Input';
// import useAxiosRequest from 'customHooks/useAxiosRequest';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { useFormDataContext } from 'state/formDataState/context';
import { TStepProps } from 'types/step';

const TicketHolderOrPayerAddress = ({ stepNavigation, currentSection }: TStepProps) => {
  const { goToNextStep, skipToStep, skipToSection } = stepNavigation;
  const [formDataState] = useFormDataContext();
  const { ticketHolderFirstName, applicationForMe } = formDataState;

  // We only want to save this step's answers into payer variables
  // when we are inside section 3 AND when aplication is for someone else,
  // otherwise we will be saving them as ticket holder information
  const ticketHolderOrPayerPostCodeVar =
    currentSection === 3 && !applicationForMe.value
      ? 'payerCurrentPostcode'
      : 'ticketHolderCurrentPostcode';
  const postcode = useFormDataSubscription(ticketHolderOrPayerPostCodeVar);

  /* const ticketHolderOrPayerAddressLine1Var =
    currentSection === 3 && !applicationForMe.value
      ? 'payerCurrentAddressLine1'
      : 'ticketHolderCurrentAddressLine1';
  const addressLine1 = useFormDataSubscription(ticketHolderOrPayerAddressLine1Var);
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

  const addresses: { text: string; value: string }[] = [
    { text: '16 summer lane', value: '16 summer lane' },
  ];

  const handleFindAddress = () => {
    postcode.save();
    /*
    const addressRequest = useAxiosRequest<TApiTicket>({
      url: `https://api.getAddress.io/find/${postcode.value}`,
    });
    const data = addressRequest.response?.data; 
    */
  };

  const handleContinue = () => {
    // addressLine1.save();
    if (currentSection === 3 && !applicationForMe.value) skipToSection(4); // because we don't need photo of payer
    if (currentSection === 2) return skipToStep(5); // because section 2 has one less step
    return skipToStep(6);
  };

  return (
    <QuestionCard question={question} handleContinue={handleContinue}>
      <p className="wmnds-m-b-lg">We&apos;ll send the ticket to this address.</p>
      <Input
        groupClassName="wmnds-m-b-md"
        className="wmnds-col-1 wmnds-col-md-2-3"
        autocomplete="autocomplete"
        name="postcode"
        inputmode="text"
        label="Postcode"
        defaultValue={postcode.value}
        onChange={(e) => postcode.set(e.target.value)}
        type="text"
      />
      <div className="wmnds-col-1">
        <Button
          btnClass="wmnds-btn--primary"
          disabled={!postcode}
          onClick={handleFindAddress}
          text="Find address"
          title="Find address"
        />
      </div>
      <Dropdown
        className="wmnds-col-1 wmnds-col-md-2-3"
        name="addressLine1"
        label="Select an address"
        options={addresses}
        // defaultValue={addressLine1.value}
        // onChange={(e) => addressLine1.set(e.target.value)}
      />
      <Button
        btnClass="wmnds-btn--link wmnds-m-b-lg"
        onClick={goToNextStep}
        text="I can't find my address in the list"
        title="I can't find my address in the list"
      />
    </QuestionCard>
  );
};

export default TicketHolderOrPayerAddress;
