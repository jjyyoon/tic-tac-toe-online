import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import CreateRoomForm from "../create-room-form/create-room-form.component";

const CreateRoom = ({ currentUser }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create Room
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateRoomForm currentUser={currentUser} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
            type="submit"
            form="createRoomForm"
          >
            Create a Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoom;
