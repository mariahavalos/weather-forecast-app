import React from 'react';
import moment from 'moment';
import './daily-detailed-display.component.scss';
import TemperatureDisplay from '../temperature-display/temperature-display.component';
import DailyChartGroup from '../daily-chart-group/daily-chart-group.component';

type Props = {
  children: {
    lattitude: string;
    longitude: string;
  };
};

class DailyDetailedDisplay extends React.Component<Props> {
  state = {
    data: null,
    weatherDescription: '',
  };
  weatherUrl =
    this.props.children.lattitude && this.props.children.longitude
      ? `${process.env.REACT_APP_WEATHER_APP_URL}&lat=${this.props.children.lattitude}&lon=${this.props.children.longitude}&appid=${process.env.REACT_APP_WEATHER_APP_KEY}`
      : `${process.env.REACT_APP_WEATHER_APP_URL}${process.env.REACT_APP_WEATHER_APP_KEY}`;

  weatherDescription = 'Light Rain';
  weatherIcon = '04d';
  weatherTemperature = '87';
  cityName = 'Atlanta';
  stateCode = 'GA';
  day = moment().format('dddd');
  time = moment().format(`hh:mm A`);

  componentDidMount() {
    this.getWeather()
      .then((res) => this.setState({ data: res.express }))
      .catch((err) => console.log(err));
  }

  getWeather = async () => {
    const response = await fetch(this.weatherUrl);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    this.weatherDescription = body.weather[0].description;
    this.weatherIcon = body.weather[0].icon;
    this.weatherTemperature = body.main.temp;
    return body;
  };

  render() {
    const props = {
      children: {
        temperature: this.weatherTemperature,
        weatherIcon: this.weatherIcon,
      },
    };

    const locationProps = {
      children: {
        lattitude: this.props.children.lattitude,
        longitude: this.props.children.longitude,
      },
    };

    return (
      <div tabIndex={1} className="daily-detailed-display-container">
        <div className="header-display">
          {this.cityName}, {this.stateCode}
        </div>
        <div className="subheader-display">
          {this.day} {this.time}
        </div>
        <div className="subheader-display description">
          {this.weatherDescription}
        </div>
        <TemperatureDisplay {...props} />
        <div aria-hidden={true} className="daily-display-chart">
          <DailyChartGroup {...locationProps} />
        </div>
      </div>
    );
  }
}

export default DailyDetailedDisplay;
