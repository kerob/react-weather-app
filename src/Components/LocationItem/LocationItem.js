import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "@material-ui/core";

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

const LocationItemWrapper = styled.li`
  position: relative;
  width: 100%;
  list-style: none;
  justify-content: left;
  text-decoration: none;
  display: flex;

  &:hover {
    background: red;
  }
`;

class LocationItem extends Component {
  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(event) {
    event.preventDefault();
    // console.log("test");
    // console.log(event.value);
    let targetLocation = "";
    if (this.props.location.state != "") {
      targetLocation =
        this.props.location.name +
        ", " +
        this.props.location.state +
        " " +
        this.props.location.id;
    } else {
      targetLocation =
        this.props.location.name +
        ", " +
        this.props.location.country +
        " " +
        this.props.location.id;
    }
    console.log(targetLocation);
  }

  render() {
    return (
      <>
        <LocationItemWrapper onClick={this.onClickHandler}>
          <IconWrapper>location_on</IconWrapper>
          {this.props.location.state
            ? this.props.location.name + ", " + this.props.location.state
            : this.props.location.name + ", " + this.props.location.country}
        </LocationItemWrapper>
      </>
    );
  }
}

export default LocationItem;
