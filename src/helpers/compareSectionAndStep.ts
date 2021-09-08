/* eslint-disable import/prefer-default-export */
import { TSectionAndStep } from 'types/subscription';

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
