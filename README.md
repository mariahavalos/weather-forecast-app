# weather-forecast-app

This is an application that pulls weather data and represents it on the frontend using React, Typescript, [OpenWeatherMap](https://openweathermap.org/api) and [OpenCage](https://opencagedata.com/api#intro) API's. 

## To run this app from the weather-forecast-app directory:
  1. clone the repo
  2. add the following variables to your .env file: 
      - REACT_APP_WEATHER_APP_KEY, your OpenWeatherMap API key.
      - REACT_APP_GEO_LOC_KEY, your OpenCage API key. 
  3. cd client
  4. npm install
  5. npm run start

## Functionality

### Completed:
  - fetches and displays current weather and represents the city, state, temperature and weather conditions
  - fetches and displays 9 hours worth of temperature data
  - fetches and displays 6 days worth of weather information summarized to high-low temps, weather conditions, and day. 
  - keyboard navigation/screen reader
  - minimal responsiveness
  - some comments
  
### Left in for structural demonstration:
  - shared/models directory

### Future Integration: 
  - observables
  - interactivity
  - more accessibility
  - add in nest/node backend/services to obscure calls
  - increase responsiveness
  - tests 
