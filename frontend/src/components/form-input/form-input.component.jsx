import React from "react";

import { Form } from "react-bootstrap";

import "./form-input.styles.scss";

const FormInput = ({ name, type, id, label, errorMessage }) => (
  <Form.Group>
    {label ? <Form.Label>{label}</Form.Label> : null}
    <Form.Control
      id={id}
      name={name}
      placeholder={label}
      type={type}
      required
    />
    {errorMessage ? <Form.Text>{errorMessage}</Form.Text> : null}
  </Form.Group>
);

export default FormInput;
