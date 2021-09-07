import React, { Component } from "react";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";

const main_color = "grey";
const secondary_color = "blue";
const hover_color = "yellow";
const disabled_color = "lightgrey";
const error_color = "red";

const InputWrapper = styled.div`
  margin: 10px;
  border-radius: 10px;

  ${(props) => {
    if (props.size) {
      switch (props.size) {
        case "sm":
          return `padding: 0px;`;
        case "md":
          return `padding 5px 0px;`;
        case "lg":
          return `padding 10px 0px;`;
        default:
          return `padding: 0px;`;
      }
    } else {
      return `padding: 0px;`;
    }
  }}

  ${(props) => {
    if (props.disabled) {
      return `border: 2px solid transparent;`;
    } else if (props.error) {
      return `border: 2px solid ${error_color};`;
    } else {
      return `border: 2px solid ${main_color};`;
    }
  }}

  ${(props) => {
    if (props.fullWidth) {
      return `display: block;`;
    } else {
      return `display: inline-block;`;
    }
  }}

  &:hover {
    background-color: ${hover_color};
  }
`;

const IconWrapper = styled(Icon)`
  color: ${main_color};
  padding: 10px;
  min-width: 50px;
  text-align: center;
  vertical-align: middle;
  position: relative;
  display: inline;
`;

const InputField = styled.input`
  ${(props) => {
    if (props.fullWidth) {
      return `width: 100%;`;
    } else {
      return `width: auto;`;
    }
  }}

  padding: 10px;
  text-align: left;
  border: none;
  border-radius: 10px;

  &:disabled {
    background-color: ${disabled_color};
    cursor: not-allowed;
  }

  &:focus {
    background-color: ${secondary_color};
  }

  &:hover {
    background-color: ${hover_color};
  }
`;

const TextField = styled.textarea`
  ${(props) => {
    if (props.fullWidth) {
      return `width: 100%;`;
    } else {
      return `width: auto;`;
    }
  }}

  ${(props) => {
    if (props.rows) {
      console.log(props.rows);
      return `height: ${15 * parseInt(props.rows)}px;`;
    } else {
      console.log("meh");
      console.log(props.rows);
      return `height: 15px;`;
    }
  }}
  padding: 10px;
  text-align: left;
  border: none;
  border-radius: 10px;

  &:disabled {
    background-color: ${disabled_color};
    cursor: not-allowed;
  }

  &:focus {
    background-color: ${secondary_color};
  }

  &:hover {
    background-color: ${hover_color};
  }
`;

const HelperText = styled.h6`
  color: ${main_color};
  text-align: left;
  padding: 5px;
  margin: 0px;
`;

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "text",
      // inputText: "",
      error: false,
    };

    // this.handleOnChange = this.handleOnChange.bind(this);
    // this.handleError = this.handleError.bind(this);
    // this.resetInputField = this.resetInputField.bind(this);
  }

  // handleOnChange(e) {
  //   //custom handler to interact with SearchPanel component
  //   this.props.onChangeHandler(e.target.value);
  //   // this.setState({
  //   //   inputText: e.target.value,
  //   // });
  // }

  // resetInputField() {
  //   this.setState({ inputText: "" });
  // }

  // handleError() {
  //   if (this.state.inputText.length >= 15) {
  //     return true;
  //   } else {
  //     return this.props.error;
  //   }
  // }

  render() {
    return (
      <>
        <InputWrapper
          disabled={this.props.disabled}
          fullWidth={this.props.fullWidth}
          error={this.props.error}
          size={this.props.size}
        >
          {this.props.helperText && (
            <HelperText>{this.props.helperText}</HelperText>
          )}
          {this.props.startIcon && ( //conditional for leading icon
            <IconWrapper style={{ marginRight: ".5rem" }}>
              {this.props.startIcon}
            </IconWrapper>
          )}
          {this.props.multiline ? ( //Conditional switch between textarea and input field based on multiline
            <TextField
              rows={this.props.rows}
              type={this.state.type}
              // value={this.props.value ? this.props.value : this.state.inputText}
              value={this.props.value}
              placeholder={this.props.placeholder}
              fullWidth={this.props.fullWidth}
              // onChange={
              //   this.props.onChange ? this.props.onChange : this.handleOnChange
              // }
              onChange={this.props.onChange}
              disabled={this.props.disabled}
            />
          ) : (
            <InputField
              type={this.state.type}
              // value={this.props.value ? this.props.value : this.state.inputText}
              value={this.props.value}
              placeholder={this.props.placeholder}
              fullWidth={this.props.fullWidth}
              // onChange={
              //   this.props.onChange ? this.props.onChange : this.handleOnChange
              // }
              onChange={this.props.onChange}
              disabled={this.props.disabled}
            />
          )}

          {this.props.endIcon && ( //conditional for ending icon
            <IconWrapper style={{ marginLeft: ".5rem" }}>
              {this.props.endIcon}
            </IconWrapper>
          )}
        </InputWrapper>
      </>
    );
  }
}

export default Input;
