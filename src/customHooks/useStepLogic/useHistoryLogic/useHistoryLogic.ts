import { useCallback, useEffect } from 'react';
import { sectionAndStepAreEqual } from 'helpers/compareSectionAndStep';
import { TUseHistoryLogic } from './useHistoryLogic.types';

const useHistoryLogic: TUseHistoryLogic = (
  currentSection,
  currentStep,
  history,
  globalStateDispatch,
  formDataStateDispatch,
) => {
  const isHistoryEmpty = !history.path.length;
  const isOnLastStepOfHistory = history.index >= history.path.length - 1;
  const hasHistoryChanged = !sectionAndStepAreEqual(history.path[history.index], {
    section: currentSection,
    step: currentStep,
  });

  // Add current step to history
  const updateFormHistory = useCallback(() => {
    if (!hasHistoryChanged) return;

    const shouldUpdateHistory = isHistoryEmpty || isOnLastStepOfHistory;
    if (!shouldUpdateHistory) return;

    const basePath = hasHistoryChanged ? history.path.slice(0, history.index) : history.path;

    if (hasHistoryChanged && !isOnLastStepOfHistory) {
      // console.log(history.path.slice(history.index));
      formDataStateDispatch({
        type: 'CLEAR_SECTION_AND_STEP_DATA',
        payload: history.path.slice(history.index),
      });
    }

    const newHistoryItem = {
      section: currentSection,
      step: currentStep,
    };

    // Final variables
    const newHistory = [...basePath, newHistoryItem];

    let newHistoryIndex = isHistoryEmpty ? 0 : history.index;
    if (isOnLastStepOfHistory && !isHistoryEmpty)
      newHistoryIndex = isOnLastStepOfHistory ? newHistory.length - 1 : history.index;

    globalStateDispatch({
      type: 'UPDATE_HISTORY',
      payload: {
        path: newHistory,
        index: newHistoryIndex,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentSection,
    currentStep,
    globalStateDispatch,
    hasHistoryChanged,
    history.index,
    history.path,
    isHistoryEmpty,
    isOnLastStepOfHistory,
  ]);

  useEffect(() => {
    // console.log('useHistoryLogic call');
    updateFormHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, currentStep]);
};

export default useHistoryLogic;
