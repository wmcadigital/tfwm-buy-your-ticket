import { useCallback, useState, useEffect } from 'react';
import { useFormDataContext } from 'state/formDataState/context';
import { useGlobalContext } from 'state/globalState/context';
import { TSubscription, TSubscriptionReturn } from 'types/subscription';
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
  const { currentSection, currentStep } = globalState.form;
  const [isNowSubscribed, setIsNowSubscribed] = useState(false); // Boolean to run the subscription only once

  // Set the step, section and isSubscribed properties in the form data
  // this way we can go back to the correct section and step from the Summary page
  const subscribeToFormData = useCallback(() => {
    const isAlreadySubscribed = savedData.isSubscribed;
    const isOnSubscribedSection = savedData.section === currentSection;
    const isOnSubscribedStep = savedData.step === currentStep;

    // Make sure this data isn't being used on another section or step
    if (isAlreadySubscribed && (!isOnSubscribedSection || !isOnSubscribedStep)) {
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
  }, [
    currentSection,
    currentStep,
    dataName,
    formDataDispatch,
    savedData.isSubscribed,
    savedData.section,
    savedData.step,
  ]);

  useEffect(() => {
    if (!isNowSubscribed) {
      subscribeToFormData();
    }
  }, [isNowSubscribed, subscribeToFormData]);

  return subscription;
};

export default useFormDataSubscription;
