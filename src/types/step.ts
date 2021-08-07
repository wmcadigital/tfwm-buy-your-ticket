export type TStepNavigation = {
  goToNextStep: () => void;
  skipToStep: (newStep: number) => void;
  skipToSection: (newStep: number) => void;
  goToSummary: () => void;
};

export type TStepProps = {
  stepNavigation: TStepNavigation;
  currentSection?: number | null;
};
