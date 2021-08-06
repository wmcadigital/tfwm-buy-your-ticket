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

  // Skips to a specific section
  const skipToSection = useCallback(
    (newSection: number) => {
      if (newSection > totalSections) {
        throw Error(
          `Cannot go to section ${newSection}, there are only ${totalSections} sections. If you want to go the summary page, "goToSummary" instead.`,
        );
      }

      if (newSection <= currentSection) {
        throw Error('"skipToSection" can only go forwards');
      }

      return globalDispatch({ type: 'GO_TO_SECTION', payload: newSection });
    },
    [currentSection, globalDispatch, totalSections],
  );

  // Skips to a specific step in the current section
  const skipToStep = useCallback(
    (newStep: number) => {
      if (newStep > totalSectionSteps) {
        throw Error(
          `Cannot go to step ${newStep}, this section only has ${totalSectionSteps} steps. If you want to go the summary page, "goToSummary" instead.`,
        );
      }

      if (newStep <= currentStep) {
        throw Error('"skipToStep" can only go forwards');
      }

      return globalDispatch({ type: 'GO_TO_STEP', payload: newStep });
    },
    [currentStep, globalDispatch, totalSectionSteps],
  );

  // Goes to the summary page
  const goToSummary = useCallback(() => {
    return globalDispatch({ type: 'SHOW_SUMMARY_PAGE' });
  }, [globalDispatch]);

  // Goes to the next step (if there is one) or the first step of the next section
  const goToNextStep = useCallback(() => {
    if (isOnLastSectionAndLastStep) return goToSummary();
    if (isOnLastStep) return skipToSection(currentSection + 1);

    const nextStep = currentStep + 1;
    return globalDispatch({ type: 'GO_TO_STEP', payload: nextStep });
  }, [
    currentSection,
    currentStep,
    globalDispatch,
    goToSummary,
    isOnLastSectionAndLastStep,
    isOnLastStep,
    skipToSection,
  ]);

  return {
    currentStep,
    currentSection,
    navigation: {
      goToNextStep,
      skipToStep,
      skipToSection,
      goToSummary,
    },
  };
};

export default useStepLogic;
