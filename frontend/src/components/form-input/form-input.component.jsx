import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ label, name, type, onChange }) => (
  <div className="form-input">
    {label ? <label htmlFor="">{label}</label> : null}
    <input
      name={name}
      placeholder={label}
      type={type}
      className="form-control"
      onChange={onChange}
      required
    />
  </div>
);

export default FormInput;
