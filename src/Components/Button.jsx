import React from "react";
import "./Button.css";

export default (props) => {
  let classes = "button";
  props.operation ? (classes += " operation") : (classes += "");
  props.label === 'clc' ? (classes += " clear") : (classes += "");
  return (
    <button
      onClick={() => {
        props.buttonClick(props.label);
      }}
      className={classes}
    >
      {props.label}
    </button>
  );
};
