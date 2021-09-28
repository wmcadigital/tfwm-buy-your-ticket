import { TGlobalState, TGlobalStateAction } from 'state/globalState/types';
import { TStepNavigation } from 'types/step';

export type TUseNavigationLogic = (
  currentSection: number,
  currentStep: number,
  totalSections: number,
  totalSectionSteps: number,
  globalState: TGlobalState,
  globalStateDispatch: React.Dispatch<TGlobalStateAction>,
) => TStepNavigation;
