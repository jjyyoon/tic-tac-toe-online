import React from "react";
import { Link } from "react-router-dom";

import PwDropdown from "../pw-dropdown/pw-dropdown.component";
import "./room-list.styles.scss";

const RoomList = ({ children, path, buttonColor, availability, password }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {children}
      {password ? (
        <div className="dropdown">
          <Link
            to={path}
            className={`badge ${buttonColor}`}
            data-toggle="dropdown"
          >
            {availability}
          </Link>
          <PwDropdown />
        </div>
      ) : (
        <Link to={path} className={`badge ${buttonColor}`}>
          {availability}
        </Link>
      )}
    </li>
  );
};

export default RoomList;
