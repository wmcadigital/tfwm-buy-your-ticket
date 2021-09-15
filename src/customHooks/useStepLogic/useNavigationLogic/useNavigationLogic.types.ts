import { TGlobalStateAction } from 'state/globalState/types';
import { TStepNavigation } from 'types/step';

export type TUseNavigationLogic = (
  currentSection: number,
  currentStep: number,
  totalSections: number,
  totalSectionSteps: number,
  globalStateDispatch: React.Dispatch<TGlobalStateAction>,
) => TStepNavigation;
