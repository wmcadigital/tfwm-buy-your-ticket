import { useCallback, useState, useEffect } from 'react';
import { useFormDataContext } from 'state/formDataState/context';
import { useGlobalContext } from 'state/globalState/context';
import { TSubscription, TSubscriptionReturn } from 'types/subscription';
import { TUseFormDataSubscription } from './useFormDataSubscription.types';

const useFormDataSubscription: TUseFormDataSubscription = (dataNames) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [globalState] = useGlobalContext();
  const { currentSection, currentStep } = globalState.form;

  const [formDataState, formDataDispatch] = useFormDataContext();
  let subscriptions: TSubscriptionReturn[] = [];

  if (dataNames.length) {
    subscriptions = dataNames.map((dataName) => {
      const currentFormData = formDataState[dataName] as TSubscription;

      const currentValue = currentFormData.value as string | number | boolean | Date;
      const set = (newValue: typeof currentValue) => {
        formDataDispatch({
          type: 'UPDATE_SUBSCRIBED_FORM_DATA',
          payload: {
            name: dataName,
            value: newValue,
          },
        });
      };

      return { value: currentValue, set };
    });
  }

  const subscribeToFormData = useCallback(() => {
    formDataDispatch({
      type: 'SUBSCRIBE_TO_FORM_DATA',
      payload: dataNames.map((dataName) => {
        const currentFormData = formDataState[dataName] as TSubscription;

        const isAlreadySubscribed =
          currentFormData.isSubscribed &&
          (currentFormData.section !== currentSection || currentFormData.step !== currentStep);

        if (isAlreadySubscribed) {
          throw new Error(
            `"${dataName}" is already subscribed to section ${currentFormData.section}, step ${currentFormData.step}.`,
          );
        }

        return {
          name: dataName,
          section: currentSection,
          step: currentStep,
        };
      }),
    });
    setIsSubscribed(true);
  }, [currentSection, currentStep, dataNames, formDataDispatch, formDataState]);

  useEffect(() => {
    if (!isSubscribed) {
      subscribeToFormData();
    }
  }, [isSubscribed, subscribeToFormData]);

  return subscriptions;
};

export default useFormDataSubscription;
