import React, { Component } from "react";
import styled from "styled-components";

const handleTempUnit = (unit) => {
  if (unit === "imperial") {
    return "F";
  } else if (unit === "metric") {
    return "C";
  }
};

const TempWrapper = styled.div`
  display: block;
  font-size: ${(props) => (props.size === "sm" ? `1.17em` : `2em`)};
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
`;

const Temperature = ({ children, ...props }) => (
  <TempWrapper {...props}>
    {children}
    <span>&#176;</span>
    {handleTempUnit(props.unit)}
  </TempWrapper>
);

export default Temperature;
