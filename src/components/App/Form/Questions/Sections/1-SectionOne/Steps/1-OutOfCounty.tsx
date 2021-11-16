import { useNavigationLogic, useFormDataSubscription } from 'customHooks';
import { Dropdown, Question } from 'components/shared';
import railData from '../../RailData.json';

const OutOfCounty = () => {
  const { goToNextStep } = useNavigationLogic('StartPage', 'TicketStartDate');
  const outOfCounty = useFormDataSubscription('outOfCounty');

  const outOfCountyStations = railData.railStationAccess
    .filter((stn) => !stn.railZone || stn.railZone > 6)
    .map((stn) => {
      return {
        text: stn.stationName,
        value: stn.stationName,
      };
    });
  const handleContinue = () => {
    if (!outOfCounty.save()) return;
    goToNextStep();
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    outOfCounty.set(e.target.value);
  };
  return (
    <Question
      question="Which Out of County train station do you want to travel to?"
      handleContinue={handleContinue}
    >
      <div className="wmnds-fe-group">
        <Dropdown
          className="wmnds-col-1 wmnds-col-md-2-3"
          name="addressLine1"
          label="Select the furthest train station in Band C you’ll travel to."
          options={outOfCountyStations}
          disabledOptionText="Choose from list"
          onChange={onChange}
          error={outOfCounty.error}
        />
      </div>
    </Question>
  );
};

export default OutOfCounty;
