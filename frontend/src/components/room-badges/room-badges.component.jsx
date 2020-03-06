import React, { useState, useRef } from "react";

import { handleFetch } from "../../handle-fetch";

import { Link } from "react-router-dom";
import { Badge, Overlay, Tooltip } from "react-bootstrap";
import CustomModal from "../custom-modal/custom-modal.component";
import PwDropdown from "../pw-dropdown/pw-dropdown.component";

import "./room-badges.styles.scss";

const RoomBadges = ({ currentUser, room, full }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const { id, created_by, password } = room;

  const handleDelete = e => {
    handleFetch("/check_availability", { roomId: id }).then(data => {
      if (data.count === 0) {
        handleFetch("/deleteroom", { roomId: id });
      } else {
        setShow(!show);
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
        <div>
          <Badge
            as={Link}
            variant="danger"
            className="badge-delete"
            onClick={handleDelete}
            ref={target}
          >
            Delete
          </Badge>
          <Overlay target={target.current} show={show} placement="left">
            <Tooltip>Sorry, this room is occupied. Please try later.</Tooltip>
          </Overlay>
        </div>
      ) : null}
      {password ? (
        <CustomModal
          color={color}
          title={title}
          header={false}
          form="room-password-form"
        >
          <PwDropdown roomId={id} />
        </CustomModal>
      ) : (
        <Badge as={Link} to={`/game/${id}`} variant={color}>
          {title}
        </Badge>
      )}
    </div>
  );
};

export default RoomBadges;
