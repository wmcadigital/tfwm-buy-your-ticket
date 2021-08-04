import { useCallback } from 'react';
import { useGlobalContext } from 'state/globalState/context';

const useStepLogic = (totalSections: number, totalSectionSteps: number) => {
  const [globalState, globalDispatch] = useGlobalContext();
  const { currentSection, currentStep } = globalState.form;

  // Helper booleans
  const isOnLastStep = totalSectionSteps === currentStep;
  const isOnLastSection = currentSection === totalSections;
  const isOnLastSectionAndLastStep = isOnLastSection && isOnLastStep;

  // Functions
  const goToNextSection = useCallback(() => {
    if (isOnLastSection) return globalDispatch({ type: 'SHOW_SUMMARY_PAGE' });

    const nextSection = currentSection + 1;
    return globalDispatch({ type: 'GO_TO_SECTION', payload: nextSection });
  }, [currentSection, globalDispatch, isOnLastSection]);

  const goToSummary = useCallback(() => {
    return globalDispatch({ type: 'SHOW_SUMMARY_PAGE' });
  }, [globalDispatch]);

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

  return {
    currentStep,
    currentSection,
    goToNextStep,
    goToNextSection,
    goToSummary,
  };
};

export default useStepLogic;
