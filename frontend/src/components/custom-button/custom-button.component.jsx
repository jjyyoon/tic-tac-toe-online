import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({ type, className, onClick, children }) => (
  <button type={type} className={className} onClick={onClick}>
    {children}
  </button>
);

export default CustomButton;
