import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({ className, handleClick, children }) => (
  <button type="submit" className={className} onClick={handleClick}>
    {children}
  </button>
);

export default CustomButton;
