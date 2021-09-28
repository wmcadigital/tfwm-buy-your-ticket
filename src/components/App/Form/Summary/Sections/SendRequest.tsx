import { useState } from 'react';
import Button from 'components/shared/Button';
import InputCheckbox from 'components/shared/Checkbox/Checkbox';
import { validate } from 'helpers/validation';
import { Nullable } from 'types/helpers';
import { TError } from 'types/validation';

const SendYourRequest = () => {
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState<Nullable<TError>>(null);

  const [hasAgreedToPrivacy, sethasAgreedToPrivacy] = useState(false);
  const [privacyError, setPrivacyError] = useState<Nullable<TError>>(null);

  const [hasAgreedToMarketing, sethasAgreedToMarketing] = useState(false);

  const toggleCheckboxValue = (
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorState?: React.Dispatch<React.SetStateAction<Nullable<TError>>>,
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (setErrorState) setErrorState(null);
      setState(e.target.checked);
    };
  };

  const handleSubmit = () => {
    const termsValidation = validate(hasAgreedToTerms, [
      { rule: 'MANDATORY_BOOLEAN', message: 'You must agree to the terms and conditions' },
    ]);

    const privacyValidation = validate(hasAgreedToPrivacy, [
      { rule: 'MANDATORY_BOOLEAN', message: 'You must agree to the privacy policy' },
    ]);

    if (!termsValidation.isValid) setTermsError(termsValidation.error);
    if (!privacyValidation.isValid) setPrivacyError(privacyValidation.error);
    if (!termsValidation.isValid || !privacyValidation.isValid) return;
    console.log('All good');
  };

  return (
    <div>
      <h3 className="wmnds-m-t-md">Now send your request</h3>
      <p>
        By submitting this request you are confirming that, to the best of your knowledge, the
        details you are providing are correct.
      </p>
      <p>
        The completion of this form will allow a Direct Debit mandate to be set up on your account
        and will appear on your bank statements as WMCA.
      </p>
      <InputCheckbox
        name="TermsAndConditions"
        classes="wmnds-m-b-md"
        labelElement={
          <span>
            Agree to the <a href="/">terms and condition</a>
          </span>
        }
        defaultValue={hasAgreedToTerms}
        onChange={toggleCheckboxValue(setHasAgreedToTerms, setTermsError)}
        error={termsError}
      />
      <InputCheckbox
        name="PrivacyPolicy"
        classes="wmnds-m-b-md"
        labelElement={
          <span>
            Agree to the <a href="/">privacy policy</a>
          </span>
        }
        defaultValue={hasAgreedToPrivacy}
        onChange={toggleCheckboxValue(sethasAgreedToPrivacy, setPrivacyError)}
        error={privacyError}
      />
      <InputCheckbox
        name="TermsAndConditions"
        classes="wmnds-m-b-md"
        labelElement={<span>Agree to be contacted for marketing</span>}
        defaultValue={hasAgreedToMarketing}
        onChange={toggleCheckboxValue(sethasAgreedToMarketing)}
      />
      <Button
        type="button"
        btnClass="wmnds-btn wmnds-btn--start wmnds-m-t-lg"
        onClick={handleSubmit}
        text="Submit"
        iconRight="general-chevron-right"
      />
    </div>
  );
};

export default SendYourRequest;
