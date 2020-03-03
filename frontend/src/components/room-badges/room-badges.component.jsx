import React from "react";
import { withRouter } from "react-router";

import { handleFetch } from "../../handle-fetch";

import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import CustomModal from "../custom-modal/custom-modal.component";
import PwDropdown from "../pw-dropdown/pw-dropdown.component";

import "./room-badges.styles.scss";

const RoomBadges = ({ history, currentUser, room, full }) => {
  const { id, created_by, password } = room;

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

  let color;
  let title;

  if (full) {
    color = "secondary";
    title = "Full";
  } else {
    color = "warning";
    title = "Join";
  }

  return (
    <div className="badge-container">
      {currentUser.userName === created_by ? (
        <Badge
          as={Link}
          variant="danger"
          className="badge-delete"
          onClick={handleDelete}
        >
          Delete
        </Badge>
      ) : null}
      {password ? (
        <CustomModal
          color={color}
          title={title}
          header={false}
          form="room-password-form"
        >
          <PwDropdown roomId={id} handleJoin={handleClick} full={full} />
        </CustomModal>
      ) : (
        <Badge
          as={Link}
          onClick={handleClick}
          to={`/game/${id}`}
          variant={color}
        >
          {title}
        </Badge>
      )}
    </div>
  );
};

export default withRouter(RoomBadges);
