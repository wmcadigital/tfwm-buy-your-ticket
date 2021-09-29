import { useCallback, useState, useEffect } from 'react';
import { useFormDataContext } from 'state/formDataState/context';
import { useGlobalContext } from 'state/globalState/context';

import { validate } from 'helpers/validation';
import { Nullable } from 'types/helpers';
import { TSubscription, TSubscriptionReturn } from 'types/subscription';
import { TError } from 'types/validation';

import { TUseFormDataSubscription } from './useFormDataSubscription.types';

const useFormDataSubscription: TUseFormDataSubscription = (dataName, validationConfig = []) => {
  // Check whether this data exists in the formData
  const [formDataState, formDataDispatch] = useFormDataContext();
  if (!Object.prototype.hasOwnProperty.call(formDataState, dataName))
    throw new Error(`The property "${dataName}" is not in formData`);

  // Variables for setting the section and step
  const [globalState] = useGlobalContext();
  const { currentSection, currentStep } = globalState.form;

  // Set the current value of for the component to the saved valued
  const savedSubscription = formDataState[dataName] as TSubscription;
  const shoudlClearSavedValue =
    savedSubscription.subscriptions.length > 0 &&
    !savedSubscription.subscriptions.some(
      (item) => item.section === currentSection && item.step === currentStep,
    );

  const savedData = shoudlClearSavedValue ? null : savedSubscription.value;
  type TSavedData = typeof savedData;

  const initialState = typeof savedData !== null ? savedData : null;
  const [currentValue, setCurrentValue] = useState<TSavedData>(initialState);

  const [error, setError] = useState<Nullable<TError>>(null);

  const validateData = useCallback(() => {
    const validation = validate(currentValue, validationConfig);
    if (!validation.isValid) {
      setError(validation.error);
      return false;
    }

    setError(null);
    return true;
  }, [currentValue, validationConfig]);

  const save = useCallback(() => {
    const isValid = validateData();
    if (isValid) {
      formDataDispatch({
        type: 'UPDATE_FORM_DATA',
        payload: {
          name: dataName,
          value: currentValue,
        },
      });
    }
    return isValid;
  }, [currentValue, dataName, formDataDispatch, validateData]);

  // return object to the component
  const subscription: TSubscriptionReturn<TSavedData> = {
    currentValue,
    set: (newValue: typeof currentValue) => setCurrentValue(newValue),
    save,
    validate: validateData,
    error,
    hasError: !!error,
  };

  const [isNowSubscribed, setIsNowSubscribed] = useState(false); // Boolean to run the subscription only once

  // Set the step, section properties in the form data
  // this way we can go back to the correct section and step from the Summary page
  const subscribeToFormData = useCallback(() => {
    // Update the data with the current section and step
    formDataDispatch({
      type: 'SUBSCRIBE_TO_FORM_DATA',
      payload: {
        dataName,
        section: currentSection,
        step: currentStep,
      },
    });

    // Stop the useEffect from running again
    setIsNowSubscribed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, currentStep, dataName, formDataDispatch]);

  useEffect(() => {
    // console.log('useFormDataSubscription call');
    if (!isNowSubscribed) {
      subscribeToFormData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNowSubscribed]);

  useEffect(() => {
    if (currentValue !== null) {
      setError(null);
    }
  }, [currentValue]);

  return subscription;
};

export default useFormDataSubscription;
