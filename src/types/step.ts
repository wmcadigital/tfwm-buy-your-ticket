import PropTypes from 'prop-types';
import { TStepNavigation, stepNavigationPropTypes } from './navigation';

// Step props
export type TStepProps = {
  stepNavigation: TStepNavigation;
  currentSection?: number | null;
};

export const stepPropTypes = {
  stepNavigation: stepNavigationPropTypes,
  currentSection: PropTypes.number,
};

// Shared steps
export type TSharedStepProps = {
  handleNavigation: () => void;
  question: string;
  dataNamePrefix: 'payer' | 'ticketHolder';
};

export const sharedStepPropTypes = {
  handleNavigation: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  dataNamePrefix: PropTypes.oneOf(['payer', 'ticketHolder']),
};
