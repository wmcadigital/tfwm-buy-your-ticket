import { useCallback } from 'react';
import { useGlobalContext } from 'state/globalState/context';
import { TUseStepLogic } from './useStepLogic.types';

const useStepLogic: TUseStepLogic = (totalSections, totalSectionSteps) => {
  const [globalState, globalDispatch] = useGlobalContext();
  const { currentSection, currentStep } = globalState.form;

  // Helper booleans
  const isOnLastStep = totalSectionSteps === currentStep;
  const isOnLastSection = currentSection === totalSections;
  const isOnLastSectionAndLastStep = isOnLastSection && isOnLastStep;

  // Goes to the next first step section (if there is one) or the summary page
  const goToNextSection = useCallback(() => {
    if (isOnLastSection) return globalDispatch({ type: 'SHOW_SUMMARY_PAGE' });

    const nextSection = currentSection + 1;
    return globalDispatch({ type: 'GO_TO_SECTION', payload: nextSection });
  }, [currentSection, globalDispatch, isOnLastSection]);

  // Goes to the summary page
  const goToSummary = useCallback(() => {
    return globalDispatch({ type: 'SHOW_SUMMARY_PAGE' });
  }, [globalDispatch]);

  // Goes to the next step (if there is one) or the first step of the next section
  const goToNextStep = useCallback(() => {
    if (isOnLastSectionAndLastStep) return goToSummary();
    if (isOnLastStep) return goToNextSection();

    const nextStep = currentStep + 1;
    return globalDispatch({ type: 'GO_TO_STEP', payload: nextStep });
  }, [
    currentStep,
    globalDispatch,
    goToNextSection,
    goToSummary,
    isOnLastSectionAndLastStep,
    isOnLastStep,
  ]);

  // Jumps to a specific step in the
  const skipToStep = useCallback(
    (newStep: number) => {
      if (newStep >= totalSectionSteps) {
        throw Error(
          `Cannot go to step ${newStep}, this section only has ${totalSectionSteps} steps`,
        );
      }

      if (newStep <= currentStep) {
        throw Error('"goToStep" can only go forwards');
      }

      return globalDispatch({ type: 'GO_TO_STEP', payload: newStep });
    },
    [currentStep, globalDispatch, totalSectionSteps],
  );

  return {
    currentStep,
    currentSection,
    navigation: {
      goToNextStep,
      skipToStep,
      goToNextSection,
      goToSummary,
    },
  };
};

export default useStepLogic;
