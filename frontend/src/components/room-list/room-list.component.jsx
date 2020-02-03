import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { handleFetch } from "../../handle-fetch";

import PwDropdown from "../pw-dropdown/pw-dropdown.component";

import "./room-list.styles.scss";

const RoomList = ({ children, roomId, availability, password, history }) => {
  const handleClick = e => {
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId })
    };

    handleFetch("/check_availability", settings).then(({ data }) => {
      if (!data.availability) {
        alert("Sorry, this room is now full :(");
        history.push("/list");
      }
    });
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {children}
      <div className={password ? "dropdown" : null}>
        <Link
          to={`/game/${roomId}`}
          className={`badge ${
            availability ? "badge-warning" : "badge-secondary"
          }`}
          data-toggle={password ? "dropdown" : null}
          onClick={handleClick}
        >
          {availability ? "Join" : "Full"}
        </Link>
        {password ? (
          <PwDropdown roomId={roomId} handleJoin={handleClick} />
        ) : null}
      </div>
    </li>
  );
};

export default withRouter(RoomList);
