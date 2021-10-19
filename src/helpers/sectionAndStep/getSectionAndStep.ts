import { formPath } from 'components/App/Form/Questions/Sections';
import type { TFormStep } from 'components/App/Form/Questions/Sections';
import type { TSectionAndStep } from 'types/navigation';

export const getSectionAndStep = (stepNameToFind: TFormStep): TSectionAndStep => {
  let returnSection: number = -1;
  let returnStep: number = -1;

  formPath.some((section, sectionIndex) => {
    const stepIndex = section.findIndex((step) => step === stepNameToFind);
    const stepFound = stepIndex >= 0;

    if (stepFound) {
      returnSection = sectionIndex + 1;
      returnStep = stepIndex + 1;
    }

    return stepFound; // Short circuits loop if found early
  });

  return { section: returnSection, step: returnStep };
};
