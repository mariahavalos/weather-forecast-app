import React from 'react';
import './daily-chart-group.component.scss';

import { AreaChart, Area, Line, XAxis } from 'recharts';
import moment from 'moment';

type Props = {
  children: {
    lattitude: string;
    longitude: string;
  };
};

class DailyChartGroup extends React.Component<Props> {
  hourlyForecast: any;
  hourlyForecastUrl =
    this.props.children.lattitude && this.props.children.longitude
      ? `${process.env.REACT_APP_HOURLY_FORECAST_URL}&lat=${this.props.children.lattitude}&lon=${this.props.children.longitude}&appid=${process.env.REACT_APP_WEATHER_APP_KEY}`
      : `${process.env.REACT_APP_HOURLY_FORECAST_URL}${process.env.REACT_APP_WEATHER_APP_KEY}`;

  componentDidMount() {
    this.getWeeklyForecast()
      .then((res) => this.setState({ hourly: res.express }))
      .catch((err) => console.log(err));
  }

  getWeeklyForecast = async () => {
    const response = await fetch(this.hourlyForecastUrl);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    // we only need about 9 hours worth of forecast, not two days.
    // so we're grabbing that here.
    this.hourlyForecast = body.hourly.slice(0, 10).map(
      (value: any) =>
        (value = {
          temp: value.temp,
          // more unix time
          time: moment.unix(value.dt).format('h A'),
        }),
    );
    return body;
  };

  render() {
    return (
      <AreaChart
        width={680}
        height={60}
        data={this.hourlyForecast}
        margin={{
          top: 2,
          bottom: 2,
        }}
      >
        <XAxis dataKey="time" />
        <Line dataKey="temp" stroke="#FFCD00" />
        <Area type="monotone" dataKey="temp" stroke="#FFCD00" fill="#FFF5D7" />
      </AreaChart>
    );
  }
}

export default DailyChartGroup;
