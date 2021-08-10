import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "@material-ui/core";

import Button from "../Components/Button/Button";
import Input from "../Components/Input/Input";
import LocationList from "../Components/LocationList/LocationList";

let cities = require("../data/city.list.json");
/*
OpenWeatherMap provided json city list
json fields are:
  id, name, state (for US Cities), country, coord (lon and lat)
  access fields by cities[y].field
*/

const main_color = "grey";

const SearchWrapper = styled.div`
  width: 100%;
  max-height: 60px;
  max-width: none;
  height: 60px;
  z-index: 1;
  top: 0;
  left: 0;

  position: fixed;
  background-color: skyblue;
  overflow-y: hidden;
  overflow-x: hidden;
  transition: height 0.25s;

  &:hover,
  &:active {
    max-height: 1000px;
    height: 100%;
  }

  @media (min-width: 65em) {
    height: 100%;
    max-width: 60px;
    max-height: none;
    width: 60px;
    z-index: 1;
    top: 0;
    left: 0;
    padding-top: 20px;
    transition: width 0.25s;

    &:hover,
    &:active {
      max-width: 1000px;
      width: 25em;
    }
  }
`;

const IconWrapper = styled(Icon)`
  color: ${main_color};
  padding: 10px;
  min-width: 25px;
  text-align: center;
  vertical-align: middle;
  position: relative;
  display: inline;
`;

// const LocationList = styled.ul`
//   position: absolute;
//   left: 0;
//   width: 100%;
// `;

// const LocationItem = styled.li`
//   position: relative;
//   width: 100%;
//   list-style: none;
//   justify-content: left;
//   text-decoration: none;
//   display: flex;

//   &:hover {
//     background: red;
//   }
// `;

class SearchPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      visibleToggle: true,
      //locationHistory: ["London", "San Francisco, CA"],
      locationHistory: [
        {
          id: 21010,
          name: "Location Test 1",
          state: "",
          country: "IR",
          coord: {
            lon: 48.279442,
            lat: 3.42944,
          },
        },
        {
          id: 30002,
          name: "US Location 2",
          state: "CA",
          country: "IR",
          coord: {
            lon: 8.279442,
            lat: 33.42944,
          },
        },
      ],
      locationSuggestions: [],
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    //this.buildLocationList = this.buildLocationList.bind(this);
  }

  onChangeHandler(text) {
    let matches = [];
    let filteredMatches = [];
    const reducerMatches = (accumulatedArray, currentValue) => {
      if (
        !accumulatedArray.find(
          (city) =>
            city.state === currentValue.state &&
            city.country === currentValue.country &&
            city.name === currentValue.name
        )
      ) {
        accumulatedArray.push(currentValue);
      }
      return accumulatedArray;
    };

    if (text.length >= 3) {
      matches = cities.filter((city) => {
        const regex = new RegExp(`${text}`, "gi");
        return city.name.match(regex);
      });

      const tempMatches = matches.reduce(reducerMatches, []);

      filteredMatches = tempMatches.reduce((acc, city) => {
        //Another reduce function to push US cities to top of search list
        if (city.state !== "") {
          return [city, ...acc];
        }
        return [...acc, city];
      }, []);
    }

    //console.log(matches);
    console.log(filteredMatches);
    this.setState({ locationSuggestions: filteredMatches });
    this.setState({ searchText: text });
  }

  // grabLocationItem(){

  // };

  // buildLocationList(itemList) {
  //   console.log("test");
  //   const outputList = itemList.map((location, index) => {
  //     <LocationItem key={index}>
  //       <IconWrapper>location_on</IconWrapper>
  //       {/* {location.state
  //           ? location.name + ", " + location.state
  //           : location.name + ", " + location.country} */}
  //       {location}
  //     </LocationItem>;
  //   });
  //   console.log(itemList);

  //   //return <LocationList>{outputList}</LocationList>;
  // }

  render() {
    if (!this.state.visibleToggle) {
      return <div>Nothing to See</div>;
    }
    return (
      <SearchWrapper>
        <Input
          startIcon="search"
          onChangeHandler={this.onChangeHandler}
        ></Input>{" "}
        {/* <Button>Search</Button> */}
        {/* {this.state.locationSuggestions ? (
          <LocationList locations={this.state.locationSuggestions} />
        ) : (
          <LocationList locations={this.state.locationHistory} />
        )} */}
        {/* <LocationList locations={this.state.locationHistory} /> */}
        {this.state.locationSuggestions && (
          <LocationList locations={this.state.locationSuggestions} />
        )}
        {/* <LocationList> */}
        {/* {this.buildLocationList(this.state.locationHistory)} */}
        {/* {this.state.locationHistory.map((location, index) => {
            return (
              <LocationItem key={index}>
                <IconWrapper>location_on</IconWrapper>
                {location}
              </LocationItem>
            );
          })} */}
        {/* </LocationList> */}
      </SearchWrapper>
    );
  }
}

export default SearchPanel;
