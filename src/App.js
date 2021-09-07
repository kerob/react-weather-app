import "./App.css";
import React, { Component } from "react";
import SearchPanel from "./SearchPanel/SearchPanel";
import Card from "./Card/Card";
import styled from "styled-components";
import { LocationContext } from "./Utilities/LocationContext/LocationContext";

const AppWrapper = styled.div`
  height: 100%;
  margin: 0;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      requestType: "",
      currentLocation: [],
    };

    this.setCurrentLocation = this.setCurrentLocation.bind(this);
    this.setRequestType = this.setRequestType.bind(this);
  }

  setCurrentLocation(locationData) {
    // console.log("setting data");
    // console.log(locationData.id);
    // console.log(this.state.requestType);
    this.setState({
      requestType: "FETCH_DATA",
      currentLocation: locationData,
    });
  }

  setRequestType() {
    let currentType = this.state.requestType;
    let newType = "";

    if (currentType === "FETCH_DATA") {
      newType = "LOCAL_DATA";
    } else {
      newType = "FETCH_DATA";
    }

    this.setState({
      requestType: newType,
    });
  }

  componentDidMount() {
    //if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        requestType: "LOCAL_DATA",
      });
    });
    //}
  }

  render() {
    return (
      <>
        <AppWrapper className="App">
          <SearchPanel
            setCurrentLocation={this.setCurrentLocation}
          ></SearchPanel>
          <Card
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            requestType={this.state.requestType}
            currentLocation={this.state.currentLocation}
          ></Card>
        </AppWrapper>
      </>
    );
  }
}

export default App;
