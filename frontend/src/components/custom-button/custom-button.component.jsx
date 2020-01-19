import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({ children, handleClick, className, id }) => (
  <button type="submit" className={className} onClick={handleClick}>
    {children}
  </button>
);

export default CustomButton;
