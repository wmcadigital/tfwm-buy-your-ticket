import { useEffect, useState } from 'react';
import { Button, Checkbox } from 'components/shared';
import { validate } from 'helpers/validation';
import { Nullable } from 'types/helpers';
import { TError } from 'types/validation';
import useSubmitSession from 'customHooks/axiosRequests/useSubmitSession/useSubmitSession';
import { useGlobalContext } from 'state/globalState/context';
import useFormDataSubscription from 'customHooks/useFormDataSubscription';

const SendYourRequest = () => {
  const submitSession = useSubmitSession();
  const [, globalStateDispatch] = useGlobalContext();

  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState<Nullable<TError>>(null);

  const [hasAgreedToPrivacy, sethasAgreedToPrivacy] = useState(false);
  const [privacyError, setPrivacyError] = useState<Nullable<TError>>(null);

  const wouldLikeNetworkClubNews = useFormDataSubscription('wouldLikeNetworkClubNews', [
    {
      rule: 'OPTIONAL',
    },
  ]);

  const toggleCheckboxValue = (
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorState?: React.Dispatch<React.SetStateAction<Nullable<TError>>>,
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (setErrorState) setErrorState(null);
      setState(e.target.checked);
    };
  };

  const handleSubmit = async () => {
    wouldLikeNetworkClubNews.save();
    const termsValidation = validate(hasAgreedToTerms, [
      { rule: 'MANDATORY_BOOLEAN', message: 'You must agree to the terms and conditions' },
    ]);

    const privacyValidation = validate(hasAgreedToPrivacy, [
      { rule: 'MANDATORY_BOOLEAN', message: 'You must agree to the privacy policy' },
    ]);

    if (!termsValidation.isValid) setTermsError(termsValidation.error);
    if (!privacyValidation.isValid) setPrivacyError(privacyValidation.error);
    if (!termsValidation.isValid || !privacyValidation.isValid) return;
    await submitSession.submitFormData();
  };

  useEffect(() => {
    if (submitSession.submissionWasSuccessful) {
      globalStateDispatch({ type: 'SHOW_SUCCESS_PAGE', payload: '987654321' });
    }
  }, [globalStateDispatch, submitSession.submissionWasSuccessful]);

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
      <Checkbox
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
      <Checkbox
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
      <Checkbox
        name="TermsAndConditions"
        classes="wmnds-m-b-md"
        labelElement={<span>Agree to be contacted for marketing</span>}
        defaultValue={wouldLikeNetworkClubNews.currentValue}
        onChange={(e) => wouldLikeNetworkClubNews.set(e.target.checked)}
      />
      <Button
        type="button"
        btnClass="wmnds-btn wmnds-btn--start wmnds-m-t-lg"
        onClick={handleSubmit}
        text="Submit"
        iconRight="general-chevron-right"
        isFetching={submitSession.isLoading}
      />
    </div>
  );
};

export default SendYourRequest;
