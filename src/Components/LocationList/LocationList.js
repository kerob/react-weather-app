import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "@material-ui/core";

import LocationItem from "../LocationItem/LocationItem";

const main_color = "grey";

const IconWrapper = styled(Icon)`
  color: ${main_color};
  padding: 10px;
  min-width: 25px;
  text-align: center;
  vertical-align: middle;
  position: relative;
  display: inline;
`;

const LocationListWrapper = styled.ul`
  position: absolute;
  left: 0;
  width: 100%;
`;

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

class LocationList extends Component {
  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(event) {
    event.preventDefault();
    console.log("test");
    console.log(event.value);
    // let targetLocation = "";
    // if (location.state != "") {
    //   targetLocation =
    //     location.name + ", " + location.state + " " + location.id;
    // } else {
    //   targetLocation =
    //     location.name + ", " + location.country + " " + location.id;
    // }
    // console.log(targetLocation);
  }

  render() {
    return (
      <>
        <LocationListWrapper>
          {this.props.locations.slice(0, 10).map((location, index) => {
            //slice limits to first 10 results, becomes overloaded otherwise
            return (
              <LocationItem location={location} key={location.id} />
              // <LocationItem
              //   key={location.id}
              //   value={
              //     location.state != ""
              //       ? location.name + ", " + location.state + " " + location.id
              //       : location.name +
              //         ", " +
              //         location.country +
              //         " " +
              //         location.id
              //   }
              //   onClick={this.onClickHandler}
              // >
              //   <IconWrapper>location_on</IconWrapper>
              //   {location.state
              //     ? location.name + ", " + location.state
              //     : location.name + ", " + location.country}
              // </LocationItem>
            );
          })}
        </LocationListWrapper>
      </>
    );
  }
}

export default LocationList;
