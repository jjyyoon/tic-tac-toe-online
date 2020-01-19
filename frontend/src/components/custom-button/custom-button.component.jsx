import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({ children, handleClick, className, id }) => (
  <button type="submit" id={id} className={className} onClick={handleClick}>
    {children}
  </button>
);

export default CustomButton;
