import Question from 'components/shared/Question/Question';
import Radios from 'components/shared/Radios/Radios';

import useFormDataSubscription from 'customHooks/useFormDataSubscription';
import { TStepProps } from 'types/step';

const HowDidYouFindOutAboutDD = ({ stepNavigation }: TStepProps) => {
  const { goToNextStep } = stepNavigation;

  const howDidYouHearAboutCentroDirectDebit = useFormDataSubscription(
    'howDidYouHearAboutCentroDirectDebit',
  );

  const handleContinue = () => {
    if (!howDidYouHearAboutCentroDirectDebit.save()) return;
    goToNextStep();
  };

  return (
    <Question
      question="How did you find out about the Direct Debit scheme?"
      handleContinue={handleContinue}
      showError={howDidYouHearAboutCentroDirectDebit.hasError}
    >
      <Radios
        name="findAboutDD"
        currentValue={howDidYouHearAboutCentroDirectDebit.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          howDidYouHearAboutCentroDirectDebit.set(e.target.value)
        }
        error={howDidYouHearAboutCentroDirectDebit.error}
        radios={[
          { text: 'Ticket finder', html: null, value: 'ticket-finder', info: null },
          { text: 'Word of mouth', html: null, value: 'word-of-mouth', info: null },
          { text: 'Advertising campaign', html: null, value: 'advertising-campaign', info: null },
          { text: 'Ticket guide leaflet', html: null, value: 'ticket-guide-leaflet', info: null },
        ]}
      />
    </Question>
  );
};

export default HowDidYouFindOutAboutDD;
