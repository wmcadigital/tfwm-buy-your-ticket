import { useCallback } from 'react';
import { TUseNavigationLogic } from './useNavigationLogic.types';

const useNavigationLogic: TUseNavigationLogic = (
  currentSection,
  currentStep,
  totalSections,
  totalSectionSteps,
  globalState,
  globalStateDispatch,
) => {
  // Helper booleans
  const isOnLastStep = totalSectionSteps === currentStep;
  const isOnLastSection = currentSection === totalSections;
  const isOnLastSectionAndLastStep = isOnLastSection && isOnLastStep;

  const { isEditing } = globalState.form;
  const editEndSectionAndStep = globalState.form.edit.to!;

  // Goes to the summary page
  const goToSummary = useCallback(() => {
    return globalStateDispatch({ type: 'SHOW_SUMMARY_PAGE' });
  }, [globalStateDispatch]);

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

      if (isEditing && newSection > editEndSectionAndStep?.section) return goToSummary();
      return globalStateDispatch({ type: 'GO_TO_SECTION', payload: newSection });
    },
    [
      currentSection,
      editEndSectionAndStep?.section,
      globalStateDispatch,
      goToSummary,
      isEditing,
      totalSections,
    ],
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

      if (isEditing && newStep > editEndSectionAndStep?.step) return goToSummary();
      return globalStateDispatch({ type: 'GO_TO_STEP', payload: newStep });
    },
    [
      currentStep,
      editEndSectionAndStep?.step,
      globalStateDispatch,
      goToSummary,
      isEditing,
      totalSectionSteps,
    ],
  );

  // Goes to the next step (if there is one) or the first step of the next section
  const goToNextStep = useCallback(() => {
    if (isOnLastSectionAndLastStep) return goToSummary();
    if (isOnLastStep) return skipToSection(currentSection + 1);

    const nextStep = currentStep + 1;
    if (isEditing && nextStep > editEndSectionAndStep?.step) return goToSummary();
    return globalStateDispatch({ type: 'GO_TO_STEP', payload: nextStep });
  }, [
    currentSection,
    currentStep,
    editEndSectionAndStep?.step,
    globalStateDispatch,
    goToSummary,
    isEditing,
    isOnLastSectionAndLastStep,
    isOnLastStep,
    skipToSection,
  ]);

  return {
    goToNextStep,
    skipToStep,
    skipToSection,
    goToSummary,
  };
};

export default useNavigationLogic;
