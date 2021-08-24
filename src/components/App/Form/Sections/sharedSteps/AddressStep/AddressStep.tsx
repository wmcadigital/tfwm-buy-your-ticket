import { useState } from 'react';
import QuestionCard from 'components/App/Form/QuestionCard/QuestionCard';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import AddressManual from './AddressManual/AddressManual';
import AddressAutocomplete from './AddressAutocomplete/AddressAutocomplete';
import { TSharedStepProps } from '../types';

const AddressStep = ({ handleNavigation, question, dataNamePrefix }: TSharedStepProps) => {
  const [isAddressMissing, setIsAddressMissing] = useState(false);
  const enterAddressManually = () => setIsAddressMissing(true);

  const addressLine1 = useFormDataSubscription(`${dataNamePrefix}CurrentAddressLine1`);
  const addressLine2 = useFormDataSubscription(`${dataNamePrefix}CurrentAddressLine2`);
  const addressLine3 = useFormDataSubscription(`${dataNamePrefix}CurrentAddressLine3`);
  const addressLine4 = useFormDataSubscription(`${dataNamePrefix}CurrentAddressLine4`);
  const postcode = useFormDataSubscription(`${dataNamePrefix}CurrentPostcode`);

  const address = {
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    postcode,
  };

  const handleContinue = () => {
    addressLine1.save();
    addressLine2.save();
    addressLine3.save();
    addressLine4.save();
    postcode.save();
    handleNavigation();
  };

  return (
    <QuestionCard question={question} handleContinue={handleContinue}>
      <p className="wmnds-m-b-lg">We&apos;ll send the ticket to this address.</p>
      {isAddressMissing ? (
        <AddressManual address={address} />
      ) : (
        <AddressAutocomplete address={address} handleNotFound={enterAddressManually} />
      )}
    </QuestionCard>
  );
};

export default AddressStep;
