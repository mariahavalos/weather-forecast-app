import React from 'react';
import './daily-display-group.component.scss';
import DailySummaryDisplay from '../../daily/daily-summary-display/daily-summary-display.component';

type Props = {
  children: {
    lattitude: string;
    longitude: string;
  };
};

class DailyDisplayGroup extends React.Component<Props> {
  weeklyForecast: any;
  weeklyForecastUrl =
    this.props.children.lattitude && this.props.children.longitude
      ? `${process.env.REACT_APP_WEEKLY_FORECAST_URL}&lat=${this.props.children.lattitude}&lon=${this.props.children.longitude}&appid=${process.env.REACT_APP_WEATHER_APP_KEY}`
      : `${process.env.REACT_APP_WEEKLY_FORECAST_URL}${process.env.REACT_APP_WEATHER_APP_KEY}`;

  componentDidMount() {
    this.getWeeklyForecast()
      .then((res) => this.setState({ weeklyForecast: res.express }))
      .catch((err) => console.log(err));
  }

  getWeeklyForecast = async () => {
    const response = await fetch(this.weeklyForecastUrl);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    this.weeklyForecast = body.daily.slice(0, 6);
    return body;
  };

  render() {
    const forecast = [];
    for (const dailyForecast in this.weeklyForecast) {
      const props = {
        children: {
          maxTemp: this.weeklyForecast[dailyForecast].temp.max.toString(),
          minTemp: this.weeklyForecast[dailyForecast].temp.min.toString(),
          weatherIcon: this.weeklyForecast[dailyForecast].weather[0].icon,
          date: this.weeklyForecast[dailyForecast].dt,
        },
      };
      forecast.push(<DailySummaryDisplay {...props} />);
    }

    return (
      <div
        tabIndex={1}
        aria-label={'maxMinWeeklyTemperatures'}
        className="daily-display-group-container"
      >
        <div tabIndex={1} className="daily-forecast">
          {forecast}
        </div>
      </div>
    );
  }
}

export default DailyDisplayGroup;
