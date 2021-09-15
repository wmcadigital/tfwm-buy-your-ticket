import { TFormDataStateAction } from 'state/formDataState/types';
import { TGlobalStateAction, TGlobalStateHistory } from 'state/globalState/types';

export type TUseHistoryLogic = (
  currentSection: number,
  currentStep: number,
  history: TGlobalStateHistory,
  globalStateDispatch: React.Dispatch<TGlobalStateAction>,
  formDataStateDispatch: React.Dispatch<TFormDataStateAction>,
) => void;
