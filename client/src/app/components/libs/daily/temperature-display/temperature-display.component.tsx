import React from 'react';
import './temperature-display.component.scss';

type Props = {
  children: {
    temperature: string;
    weatherIcon: string;
  };
};
export class TemperatureDisplay extends React.Component<Props> {
  render() {
    const { temperature, weatherIcon } = this.props.children;

    return (
      <div className="temperature-display-container">
        <span className="weather-icon">
          <img
            alt="weatherConditionIcon"
            src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
          />
        </span>
        <span className="temperature">
          {temperature}
          <sup className="degree">&deg;F</sup>
        </span>
      </div>
    );
  }
}

export default TemperatureDisplay;
