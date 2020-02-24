import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Modal, Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const CustomModal = ({ color, title, header, children, form }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Badge as={Link} variant={color} onClick={handleShow}>
        {`${title} `}
        {title === "Join" ? <FontAwesomeIcon icon={faLock} /> : null}
      </Badge>

      <Modal show={show} onHide={handleClose}>
        {header ? (
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        ) : null}
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="info"
            onClick={handleClose}
            type="submit"
            form={form}
          >
            {title}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomModal;
