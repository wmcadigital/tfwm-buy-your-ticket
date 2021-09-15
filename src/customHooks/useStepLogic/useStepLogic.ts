import { useFormDataContext } from 'state/formDataState/context';
import { useGlobalContext } from 'state/globalState/context';
import { useHistoryLogic } from './useHistoryLogic';
import { useNavigationLogic } from './useNavigationLogic';
import { TUseStepLogic } from './useStepLogic.types';

const useStepLogic: TUseStepLogic = (totalSections, totalSectionSteps) => {
  const [globalState, globalStateDispatch] = useGlobalContext();
  const { currentSection, currentStep, history } = globalState.form;
  const [, formDataStateDispatch] = useFormDataContext();

  // Hook to handle the logic of the 'path' the user takes through the form
  useHistoryLogic(currentSection, currentStep, history, globalStateDispatch, formDataStateDispatch);

  // Hook to create all navigation functions for steps and sectiosn to use
  const navigation = useNavigationLogic(
    currentSection,
    currentStep,
    totalSections,
    totalSectionSteps,
    globalStateDispatch,
  );

  return {
    currentStep,
    currentSection,
    navigation,
  };
};

export default useStepLogic;
