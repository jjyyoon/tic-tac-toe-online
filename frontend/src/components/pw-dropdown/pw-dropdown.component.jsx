import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

const PwDropdown = () => {
  return (
    <div className="dropdown-menu">
      <form className="px-4 py-3">
        <div className="form-group">
          <FormInput label="Password" name="password" type="password" />
        </div>
        <CustomButton className="btn btn-info">Join</CustomButton>
      </form>
    </div>
  );
};

export default PwDropdown;
