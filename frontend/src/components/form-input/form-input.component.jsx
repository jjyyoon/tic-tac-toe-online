import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ label, type }) => (
  <div className="form-input">
    <label htmlFor="">{label}</label>
    <input type={type} placeholder={label} className="form-control" />
  </div>
);

export default FormInput;
