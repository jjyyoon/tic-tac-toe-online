import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ label, name, type }) => (
  <div className="form-input">
    <label htmlFor="">{label}</label>
    <input
      name={name}
      placeholder={label}
      type={type}
      className="form-control"
    />
  </div>
);

export default FormInput;
