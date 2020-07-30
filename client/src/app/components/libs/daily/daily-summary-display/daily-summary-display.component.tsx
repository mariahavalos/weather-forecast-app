import React from 'react';
import moment from 'moment';
import './daily-summary-display.component.scss';

type Props = {
  children: {
    maxTemp: string;
    minTemp: string;
    weatherIcon: string;
    date: string;
  };
};

class DailySummaryDisplay extends React.Component<Props> {
  render() {
    const { maxTemp, minTemp, weatherIcon, date } = this.props.children;

    return (
      <div className="daily-summary-display-container">
        <p>{moment.unix(parseInt(date)).format('ddd')}</p>
        <div className="weather-icon">
          <img
            alt="weatherConditionIcon"
            src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
          />
        </div>
        <div className="maxMinTemp">
          <span className="max-temp">
            {maxTemp}
            <sup>&deg;</sup>
          </span>
          <span>
            {minTemp}
            <sup>&deg;</sup>
          </span>
        </div>
      </div>
    );
  }
}

export default DailySummaryDisplay;
