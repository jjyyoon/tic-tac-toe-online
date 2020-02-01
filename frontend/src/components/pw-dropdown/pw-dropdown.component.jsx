import React from "react";
import { withRouter } from "react-router";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

const PwDropdown = ({ roomId, handleJoin, history }) => {
  const handleSubmit = async e => {
    e.preventDefault();
    const password = e.target.password.value;
    const res = await fetch("/pwcheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, password })
    });

    if (res && res.status === 200) {
      const data = await res.json();
      if (data.match) {
        handleJoin();
        history.push(`/game/${roomId}`);
      } else {
        alert("Wrong password for this room!");
      }
    }
  };

  return (
    <div className="dropdown-menu">
      <form className="px-4 py-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <FormInput label="Password" name="password" type="password" />
        </div>
        <CustomButton type="submit" className="btn btn-info">
          Join
        </CustomButton>
      </form>
    </div>
  );
};

export default withRouter(PwDropdown);
