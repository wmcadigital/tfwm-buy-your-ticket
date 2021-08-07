import { useCallback, useState, useEffect } from 'react';
import { useFormDataContext } from 'state/formDataState/context';
import { useGlobalContext } from 'state/globalState/context';
import { TSectionAndStep, TSubscription, TSubscriptionReturn } from 'types/subscription';
import { TUseFormDataSubscription } from './useFormDataSubscription.types';

const useFormDataSubscription: TUseFormDataSubscription = (dataName, initialState) => {
  // Check whether this data exists in the formData
  const [formDataState, formDataDispatch] = useFormDataContext();
  if (!Object.prototype.hasOwnProperty.call(formDataState, dataName))
    throw new Error(`The property "${dataName}" is not in formData`);

  // Set the current value of for the component to the saved valued
  const savedData = formDataState[dataName] as TSubscription;
  const [currentValue, setCurrentValue] = useState<typeof savedData.value>(
    savedData.value || initialState || null,
  );

  // return object to the component
  const subscription: TSubscriptionReturn<typeof savedData.value> = {
    value: currentValue,
    set: (newValue: typeof currentValue) => setCurrentValue(newValue),
    save: () => {
      formDataDispatch({
        type: 'UPDATE_SUBSCRIBED_FORM_DATA',
        payload: {
          name: dataName,
          value: currentValue,
        },
      });
    },
  };

  // Variables for setting the section and step
  const [globalState] = useGlobalContext();
  const { currentSection, currentStep, history } = globalState.form;
  const [isNowSubscribed, setIsNowSubscribed] = useState(false); // Boolean to run the subscription only once

  // Helper to compare a given section and step to the current section and current step
  const compareSectionAndStep = (a: TSectionAndStep, b: TSectionAndStep) => {
    return a.section === b.section && a.step === b.step;
  };

  // Set the step, section properties in the form data
  // this way we can go back to the correct section and step from the Summary page
  const subscribeToFormData = useCallback(() => {
    // If a previous subscription to this form data is in history (i.e. the user has already completed it) we'll be overwriting data and that's a no-no
    const isAlreadySubscribed = history.some((historyItem) => {
      return compareSectionAndStep(historyItem, savedData);
    });
    // If we're on the sectoin/step that this form data is subscribed to then we are allowed to overwrite it
    const isOnSubscribedSectionAndStep = compareSectionAndStep(savedData, {
      section: currentSection,
      step: currentStep,
    });

    // Make sure this data isn't being used on another section or step that's already been completed
    if (isAlreadySubscribed && !isOnSubscribedSectionAndStep) {
      throw new Error(
        `"${dataName}" is already subscribed to section ${savedData.section}, step ${savedData.step}.`,
      );
    }

    // Update the data with the current section and step
    formDataDispatch({
      type: 'SUBSCRIBE_TO_FORM_DATA',
      payload: {
        name: dataName,
        section: currentSection,
        step: currentStep,
      },
    });

    // Stop the useEffect from running again
    setIsNowSubscribed(true);
  }, [currentSection, currentStep, dataName, formDataDispatch, history, savedData]);

  useEffect(() => {
    if (!isNowSubscribed) {
      subscribeToFormData();
    }
  }, [isNowSubscribed, subscribeToFormData]);

  return subscription;
};

export default useFormDataSubscription;
