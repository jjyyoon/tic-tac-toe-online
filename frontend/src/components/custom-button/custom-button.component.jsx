import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({ className, children }) => (
  <button type="submit" className={className}>
    {children}
  </button>
);

export default CustomButton;
