import React from "react";

import { ListGroup } from "react-bootstrap";
import RoomBadges from "../room-badges/room-badges.component";

import "./room-list.styles.scss";

const RoomList = ({ currentUser, room }) => {
  const { name, created_by, user1, user2, size } = room;

  let full;
  let str;

  if (user1 && user2) {
    full = true;
    str = `(2/2 : ${user1}, ${user2})`;
  } else {
    full = false;
    if (user1 && !user2) {
      str = `(1/2 : ${user1})`;
    } else {
      str = "(0/2)";
    }
  }

  return (
    <ListGroup.Item>
      {`[${size}×${size}] ${name}`}
      <span>{` ${str}`}</span>
      <span>{`　Created by ${created_by}`}</span>
      <RoomBadges currentUser={currentUser} room={room} full={full} />
    </ListGroup.Item>
  );
};

export default RoomList;
