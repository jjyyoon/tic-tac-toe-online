import React from "react";
import { Link } from "react-router-dom";

import "./room-list.styles.scss";

const RoomList = ({ children, to, buttonColor, availability }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {children}
      <Link to={to} className={`badge ${buttonColor}`}>
        {availability}
      </Link>
    </li>
  );
};

export default RoomList;