import React, { Component } from 'react';
import moment from 'moment';
import './app.scss';
import DailyDetailedDisplay from './components/libs/daily/daily-detailed-display/daily-detailed-display.component';
import DailyDisplayGroup from './components/libs/weekly/daily-display-group/daily-display-group.component';

class App extends Component {
  state = {
    data: null,
  };
  cityName = 'Atlanta';
  stateCode = 'GA';
  day = moment().format('dddd');
  time = moment().format('hh:mm');
  lattitude = 33.749;
  longitude = -84.388;

  componentDidMount() {
    // get geolocation if possible and assign as props to children
    // otherwise show as atlanta defaults

    this.getCurrentPosition().then((position: any) => {
      this.lattitude = position.coords?.latitude.toString();
      this.longitude = position.coords?.longitude.toString();

      this.getCityInfo().catch((err: any) => console.log(err));
    })
  }

  getCurrentPosition(): any {
    return new Promise((resolve,reject)=> {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  // currently only works for US based addresses due to dependency on FIPS and state. 
  getCityInfo = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_GEO_LOC_URL}q=${this.lattitude}+${this.longitude}&key=${process.env.REACT_APP_GEO_LOC_KEY}`,
    );
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    this.stateCode = body.results[0]?.annotations?.FIPS;
    this.cityName = body.results[0]?.address_components?.short_name;
  };

  render() {
    const props = {
      children: {
        lattitude: this.lattitude.toString(),
        longitude: this.longitude.toString(),
      },
    };

    return (
      <div className="app">
        <div className="display-container">
          <h1 tabIndex={1}>Local Weather Information</h1>
          <div className="daily-display">
            <DailyDetailedDisplay {...props} />
          </div>
          <DailyDisplayGroup {...props} />
        </div>
      </div>
    );
  }
}

export default App;
