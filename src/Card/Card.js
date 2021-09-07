import React, { Component } from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Button from "../Components/Button/Button";
import { Fragment } from "react";
import { convertDate } from "../Utilities/Date/Date";
import Temperature from "../Components/Temperature/Temperature";
import { ContactSupportOutlined } from "@material-ui/icons";

const IconWrapper = styled(Icon)`
  vertical-align: middle;
  position: relative;
  top: -1px;
  margin-right: 0.5rem;
`;

const CardWrapper = styled.div`
  background-color: pink;
  display: inline-block;
  margin-top: 50px;
  height: 100%;
  width: 100%;

  @media (min-width: 65em) {
    margin-left: 50px;
    margin-top: 0;
  }
`;

const WeekForecast = styled.div`
  padding: 20px;
  margin: 25px;
  background-color: lightgreen;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);

  @media (min-width: 65em) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: 1fr;
  }
`;

const WeekDayForecast = styled.div`
  background-color: #7fffd4;
  margin: 15px;
  padding: auto;
`;

const CurrentWeather = styled.div`
  background: blueviolet;
  display: grid;
  grid-auto-flow: row;

  @media (min-width: 65em) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

const CurrentForecast = styled.div`
  margin: 50px;
  background: coral;
`;

const CurrentDetails = styled.div`
  margin: 50px;
  background: darkseagreen;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  .details-item & {
    margin: 15px;
    padding: auto;
  }
`;

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      weeklyForecast: [],
      unit: "imperial",
      date: "",
      location: "",
      temp: "",
      status: "",
      temp_min: "",
      temp_max: "",
      humidity: "",
      wind_speed: "",
      wind_direction: "",
      visibility: "",
      air_pressure: "",
      icon: "",
    };

    this.changeTempUnits = this.changeTempUnits.bind(this);
    this.grabWeatherData = this.grabWeatherData.bind(this);
  }

  grabWeatherData() {
    //check for Weather API, maybe add location check?
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {

    let latitude = 0;
    let longitude = 0;

    if (this.props.requestType === "LOCAL_DATA") {
      latitude = this.props.latitude;
      longitude = this.props.longitude;
    } else if (this.props.requestType === "FETCH_DATA") {
      latitude = this.props.currentLocation.coord.lat;
      longitude = this.props.currentLocation.coord.lon;
    }

    //OpenWeatherMap One Call API
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=${this.state.unit}`
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: json.results,
          weeklyForecast: json.daily,
          date: convertDate(json.current.dt),
          location: json.timezone,
          temp: json.current.temp,
          temp_min: json.daily[0].temp.min,
          temp_max: json.daily[0].temp.max,
          status: json.current.weather[0].main,
          humidity: json.current.humidity,
          wind_speed: json.current.wind_speed,
          wind_direction: json.current.wind_deg,
          visibility: json.current.visibility,
          air_pressure: json.current.pressure,
          icon: `http://openweathermap.org/img/wn/${json.current.weather[0].icon}.png`,
        });
      });
    //   });
    // }
  }

  changeTempUnits() {
    let newUnit = "";
    if (this.state.unit === "imperial") {
      newUnit = "metric";
    } else if (this.state.unit === "metric") {
      newUnit = "imperial";
    }
    console.log("hello");
    this.setState({ unit: newUnit });
  }

  componentDidMount() {
    this.grabWeatherData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.unit !== this.state.unit) {
      this.grabWeatherData();
    } else if (prevProps.currentLocation.id !== this.props.currentLocation.id) {
      this.grabWeatherData();
    }
  }

  render() {
    return (
      <CardWrapper>
        <CurrentWeather>
          <CurrentForecast>
            <Button onClick={this.changeTempUnits}>Change Unit</Button>
            <br />
            <h2>{this.state.date}</h2>
            <img src={this.state.icon} alt="Today's Weather" />
            <Temperature unit={this.state.unit}>{this.state.temp}</Temperature>
            <div>
              <Temperature size="sm" unit={this.state.unit}>
                Min: {this.state.temp_min}
              </Temperature>
              <Temperature size="sm" unit={this.state.unit}>
                Max: {this.state.temp_max}
              </Temperature>
            </div>
            <h1>
              <IconWrapper>location_on</IconWrapper>
              {this.state.location}
            </h1>
          </CurrentForecast>
          <CurrentDetails>
            <div className="details-item">
              Wind Status
              <h2>
                {this.state.wind_speed}{" "}
                {this.state.unit === "imperial" ? "mph" : "mps"}
              </h2>
              <h4>{this.state.wind_direction}</h4>
            </div>
            <div className="details-item">
              Humidity
              <h2>{this.state.humidity}%</h2>
            </div>
            <div className="details-item">
              Air Pressure
              <h2>{this.state.air_pressure}</h2>
            </div>
            <div className="details-item">
              Visibility
              <h2>{this.state.visibility} miles</h2>
            </div>
          </CurrentDetails>
        </CurrentWeather>
        <WeekForecast>
          {this.state.weeklyForecast.map((day, index) => {
            return (
              <WeekDayForecast key={index}>
                <h3>{convertDate(day.dt)}</h3>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="Week Weather"
                />
                <h2>{day.weather[0].main}</h2>
                <div>
                  <Temperature size="sm" unit={this.state.unit}>
                    Min: {day.temp.min}
                  </Temperature>
                  <Temperature size="sm" unit={this.state.unit}>
                    Max: {day.temp.max}
                  </Temperature>
                </div>
              </WeekDayForecast>
            );
          })}
        </WeekForecast>
      </CardWrapper>
    );
  }
}

export default Card;
