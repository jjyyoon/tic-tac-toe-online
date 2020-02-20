import React from "react";
import { withRouter } from "react-router";

import { Row, Col } from "react-bootstrap";
import WithAuth from "../../components/auth/with-auth";
import RoomListContainer from "../../components/room-list-container/room-list-container.component";
import ChatWindow from "../../components/chat-window/chat-window.component";

const RoomListPage = ({ currentUser, chatSocket }) => (
  <Row className="room-list-page">
    <Col className="left">
      <RoomListContainer currentUser={currentUser} chatSocket={chatSocket} />
    </Col>
    <Col className="right">
      <ChatWindow
        currentUser={currentUser}
        chatSocket={chatSocket}
        events={["load a global chat"]}
        userList={true}
      />
    </Col>
  </Row>
);

export default withRouter(WithAuth(RoomListPage));
