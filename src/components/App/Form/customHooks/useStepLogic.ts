import { useCallback } from 'react';
import { useGlobalContext } from 'state/globalState/context';

const useStepLogic = (totalSections: number, totalSectionSteps: number) => {
  const [globalState, globalDispatch] = useGlobalContext();
  const { currentSection, currentStep } = globalState.form;

  const goToNextStep = useCallback(() => {
    if (currentStep < totalSectionSteps) {
      globalDispatch({ type: 'GO_TO_STEP', payload: currentStep + 1 });
    } else {
      globalDispatch({ type: 'GO_TO_SECTION', payload: currentStep + 1 });
    }
  }, [currentStep, globalDispatch, totalSectionSteps]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 1) {
      globalDispatch({ type: 'GO_TO_STEP', payload: currentStep - 1 });
    } else {
      globalDispatch({ type: 'GO_TO_SECTION', payload: totalSectionSteps });
    }
  }, [currentStep, globalDispatch, totalSectionSteps]);

  const goToNextSection = useCallback(() => {
    if (currentSection < totalSections) {
      globalDispatch({ type: 'GO_TO_SECTION', payload: currentSection + 1 });
    } else {
      globalDispatch({ type: 'FINISH_FORM' });
    }
  }, [currentSection, globalDispatch, totalSections]);

  const goToPrevSection = useCallback(() => {
    if (currentSection > 1) {
      globalDispatch({ type: 'GO_TO_SECTION', payload: currentSection - 1 });
    } else {
      globalDispatch({ type: 'SHOW_START_PAGE' });
    }
  }, [currentSection, globalDispatch]);

  return {
    currentStep,
    currentSection,
    goToNextStep,
    goToPrevStep,
    goToNextSection,
    goToPrevSection,
  };
};

export default useStepLogic;
