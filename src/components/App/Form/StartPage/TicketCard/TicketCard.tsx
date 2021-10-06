import PropTypes from 'prop-types';
import Button from 'components/shared/Button';
import NIconText from 'components/shared/NIconText';
import Icon from 'components/shared/Icon';
import { TTicketCardProps } from './TicketCard.types';
import s from './TicketCard.module.scss';

const TicketCard = ({ ticket }: TTicketCardProps) => {
  const returnToTicketFinder = () => {
    window.location.href = 'https://find-a-ticket.tfwm.org.uk/';
  };

  return (
    <div className={`wmnds-content-card ${s.ticketCard}`}>
      <div className="wmnds-grid wmnds-p-md wmnds-p-b-none">
        <div className="wmnds-col-1-1 wmnds-col-md-2-3">
          <h2 className="wmnds-content-card__title wmnds-m-b-md">
            <NIconText className="wmnds-m-r-sm" text={ticket.name} />
            <div className={s.modeIconWrapper}>
              {ticket.modes.map((mode) => (
                <Icon
                  key={`icon-${mode}`}
                  iconName={`modes-isolated-${mode}`}
                  className={`${s.modeIcon} ${s[mode]}`}
                />
              ))}
            </div>
          </h2>
          <h3 className="wmnds-m-t-none wmnds-m-b-md">{ticket.priceString}</h3>
        </div>
        <div className="wmnds-col-1-1 wmnds-col-md-1-3">
          <Button
            text="Change your ticket"
            btnClass={`wmnds-btn wmnds-btn--secondary wmnds-btn--block wmnds-m-b-md ${s.changeTicketBtn}`}
            onClick={returnToTicketFinder}
          />
        </div>
      </div>
    </div>
  );
};

TicketCard.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    modes: PropTypes.arrayOf(PropTypes.oneOf(['bus', 'rail', 'metro']).isRequired).isRequired,
  }).isRequired,
};

export default TicketCard;
