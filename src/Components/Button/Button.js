import React from "react";
import styled from "styled-components";
//import {props.startIcon} from '@material-ui/icons';
import Icon from "@material-ui/core/Icon";

const handleColorType = (color) => {
  switch (color) {
    case "primary":
      return ["white", "#5c6cff"];
    case "secondary":
      return ["white", "#ffcb5c"];
    case "danger":
      return ["white", "#ff0000"];
    default:
      return ["black", "#dbdbdb"];
  }
};

const handleSize = (size) => {
  switch (size) {
    case "sm":
      return "padding: 0.15rem 0.25rem;";
    case "md":
      return "padding: 0.25rem 0.5rem;";
    case "lg":
      return "padding: 0.5rem 0.75rem;";
    case "xl":
      return "padding: 0.75rem 1rem;";
    default:
      return "padding: 0.25rem 0.5rem;";
  }
};

const handleShadow = (disableShadow) => {
  if (!disableShadow) {
    return " -webkit-box-shadow: 7px 9px 15px -4px rgba(0, 0, 0, 0.7); box-shadow: 7px 9px 15px -4px rgba(0, 0, 0, 0.7);";
  } else {
    return;
  }
};

const handleType = (type, color) => {
  //console.log(color);
  switch (type) {
    case "outline":
      if (color[0] === "black" && color[1] === "#dbdbdb") {
        return (
          "color: " +
          color[0] +
          "; background-color: transparent; border: 2px solid " +
          color[0] +
          ";"
        );
      } else {
        return (
          "color: " +
          color[1] +
          "; background-color: " +
          color[0] +
          "; border: 2px solid " +
          color[1] +
          ";"
        );
      }
    case "text":
      if (color[0] === "black" && color[1] === "#dbdbdb") {
        return (
          "color: " + color[0] + "; background-color: transparent; border: 0;"
        );
      } else {
        return (
          "color: " + color[1] + "; background-color: transparent; border: 0;"
        );
      }
    default:
      return (
        "color: " +
        color[0] +
        "; background-color: " +
        color[1] +
        "; border: 0;"
      );
  }
};

const theme = {
  primary: "#5c6cff",
  secondary: "#ffcb5c;",
  danger: "#ff0000;",
  default: "#dbdbdb;",
};

const IconWrapper = styled(Icon)`
  vertical-align: middle;
  position: relative;
  top: -1px;
`;

const ButtonWrapper = styled.button`
  border: 0;
  border-radius: 0.25rem;

  ${(props) => handleShadow(props.disableShadow)};
  ${(props) => handleSize(props.size)};
  ${(props) => handleType(props.type, handleColorType(props.color))};

  font-family: -system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.2;

  white-space: nowrap;
  text-decoration: none;
  text-align: center;

  margin: 1rem;
  cursor: pointer;

  &:hover,
  &:focus {
    color: white; // <Thing> when hovered
    background-color: green;
    transition-duration: 0.4s;
  }

  &:disabled {
    background-color: grey;
    color: black;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Button = ({ children, ...props }) => (
  <ButtonWrapper {...props}>
    <div>
      {props.startIcon && (
        <IconWrapper style={{ marginRight: ".5rem" }}>
          {props.startIcon}
        </IconWrapper>
      )}
      {children}
      {props.endIcon && (
        <IconWrapper style={{ marginLeft: ".5rem" }}>
          {props.endIcon}
        </IconWrapper>
      )}
    </div>
  </ButtonWrapper>
);

export default Button;
