import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { handleFetch } from "../../handle-fetch";

import PwDropdown from "../pw-dropdown/pw-dropdown.component";

import { Badge } from "react-bootstrap";
import "./room-list.styles.scss";

const RoomList = ({ history, room, availability, children, currentUser }) => {
  const { id, password, created_by } = room;

  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId: id })
  };

  const handleClick = e => {
    handleFetch("/check_availability", settings).then(({ data }) => {
      if (data.count === 2) {
        alert("Sorry, this room is now full :(");
        history.push("/list");
      }
    });
  };

  const handleDelete = e => {
    handleFetch("/check_availability", settings).then(({ data }) => {
      if (data.count === 0) {
        handleFetch("/deleteroom", settings);
      } else {
        alert("Sorry, this room is occupied. Please try later.");
      }
    });
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {children}
      <div className="badge-container">
        {currentUser.userName === created_by ? (
          <Badge
            as="a"
            variant="danger"
            className="badge-delete"
            onClick={handleDelete}
          >
            Delete
          </Badge>
        ) : null}

        <div className={`link-container ${password ? "dropdown" : null}`}>
          <Link
            to={`/game/${id}`}
            className={`badge ${
              availability ? "badge-warning" : "badge-secondary"
            }`}
            data-toggle={password ? "dropdown" : null}
            onClick={handleClick}
          >
            {availability ? "Join" : "Full"}
          </Link>
          {password ? (
            <PwDropdown roomId={id} handleJoin={handleClick} />
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default withRouter(RoomList);
