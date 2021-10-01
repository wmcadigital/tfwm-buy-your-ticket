/* eslint-disable import/prefer-default-export */
import { TSectionAndStep } from 'types/sectionAndStep';

export const sectionAndStepAreEqual = (a: TSectionAndStep, b: TSectionAndStep): boolean => {
  const sectionEqual = a?.section === b?.section;
  const stepEqual = a?.step === b?.step;
  return sectionEqual && stepEqual;
};

export const arrayContainsSectionAndStep = (
  array: TSectionAndStep[],
  comparison: TSectionAndStep,
) => {
  return array.some((item) => {
    return sectionAndStepAreEqual(item, comparison);
  });
};

export const isSectionAndStepGreater = (a: TSectionAndStep, b: TSectionAndStep): boolean => {
  if (a.section > b.section) return true;
  return a.section >= b.section && a.step > b.step;
};
