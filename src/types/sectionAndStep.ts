export type TSectionAndStep = {
  section: number;
  step: number;
};

// Section
export type TSectionProps = {
  totalSections: number;
};

// Step
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

export type TSharedStepProps = {
  handleNavigation: () => void;
  question: string;
  dataNamePrefix: 'payer' | 'ticketHolder';
};
