import { useCallback, useState, useEffect, useMemo } from 'react';
import { useFormDataContext } from 'state/formDataState/context';
import { useGlobalContext } from 'state/globalState/context';
import { Nullable } from 'types/helpers';
import { TSectionAndStep, TSubscriptionReturn } from 'types/subscription';
import { TUseFormDataSubscription } from './useFormDataSubscription.types';

const useFormDataSubscription: TUseFormDataSubscription = (dataName, initialState) => {
  // Check whether this data exists in the formData
  const [formDataState, formDataDispatch] = useFormDataContext();
  if (!Object.prototype.hasOwnProperty.call(formDataState, dataName))
    throw new Error(`The property "${dataName}" is not in formData`);

  // Set the current value of for the component to the saved valued
  const savedData = formDataState[dataName];
  type TSavedData = typeof savedData;

  const [currentValue, setCurrentValue] = useState<TSavedData>(savedData || initialState || null);

  // return object to the component
  const subscription: TSubscriptionReturn<TSavedData> = {
    value: currentValue,
    set: (newValue: typeof currentValue) => setCurrentValue(newValue),
    save: () => {
      formDataDispatch({
        type: 'UPDATE_FORM_DATA',
        payload: {
          name: dataName,
          value: !currentValue,
        },
      });
    },
  };

  // Variables for setting the section and step
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { currentSection, currentStep, history } = globalState.form;
  const [isNowSubscribed, setIsNowSubscribed] = useState(false); // Boolean to run the subscription only once

  const dataHistory: Nullable<TSectionAndStep> = useMemo(() => {
    if (!history.current.length) return null;
    const historyItem = history.current.filter((item) => item.subscriptions.indexOf(dataName) >= 0);
    return historyItem.length ? historyItem[0] : null;
  }, [dataName, history]);

  // Set the step, section properties in the form data
  // this way we can go back to the correct section and step from the Summary page
  const subscribeToFormData = useCallback(() => {
    const { section, step } = (dataHistory as TSectionAndStep) || {};
    // If a previous subscription to this form data is in history (i.e. the user has already completed it) we'll be overwriting data and that's a no-no
    const isAlreadySubscribed = dataHistory !== null;
    // If we're on the section/step that this form data is subscribed to then we are allowed to overwrite it
    const isOnSubscribedSectionAndStep = section === currentSection && step === currentStep;

    // Make sure this data isn't being used on another section or step that's already been completed
    if (isAlreadySubscribed && !isOnSubscribedSectionAndStep) {
      throw new Error(`"${dataName}" is already subscribed to section ${section}, step ${step}.`);
    }

    // Update the data with the current section and step
    globalStateDispatch({
      type: 'SUBSCRIBE_TO_FORM_DATA',
      payload: dataName,
    });

    // Stop the useEffect from running again
    setIsNowSubscribed(true);
  }, [currentSection, currentStep, dataHistory, dataName, globalStateDispatch]);

  useEffect(() => {
    if (!isNowSubscribed) {
      subscribeToFormData();
    }
  }, [isNowSubscribed, subscribeToFormData]);

  return subscription;
};

export default useFormDataSubscription;
