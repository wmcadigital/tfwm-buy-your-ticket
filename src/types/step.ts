export type TStepNavigation = {
  goToNextStep: () => void;
  skipToStep: (newStep: number) => void;
  goToNextSection: () => void;
  goToSummary: () => void;
};

export type TStepProps = {
  stepNavigation: TStepNavigation;
  currentSection?: number | null;
};
