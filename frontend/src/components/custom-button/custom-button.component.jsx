import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({ children }) => (
  <button className="btn btn-lg btn-primary btn-block" type="submit">
    {children}
  </button>
);

export default CustomButton;
