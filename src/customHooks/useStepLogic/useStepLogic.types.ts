import { TStepNavigation } from 'types/step';

export type TUseStepLogic = (
  totalSections: number,
  totalSectionSteps: number,
) => {
  currentSection: number;
  currentStep: number;
  navigation: TStepNavigation;
};
