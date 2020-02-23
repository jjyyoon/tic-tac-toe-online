import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { Alert, Button } from "react-bootstrap";

const AlertBox = ({
  color,
  heading,
  children,
  btnFunc,
  history,
  page,
  funcAdded
}) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);

    if (funcAdded) {
      funcAdded();
    }
  };

  if (show) {
    return (
      <Alert
        variant={color}
        onClose={handleClose}
        dismissible={btnFunc === "close" ? true : false}
      >
        <Alert.Heading>{heading}</Alert.Heading>
        {children ? <p>{children}</p> : null}

        {btnFunc === "redirect" ? (
          <div>
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                onClick={() => history.push(`/${page}`)}
                variant="outline-danger"
              >
                {`Go back to the ${page} page`}
              </Button>
            </div>
          </div>
        ) : null}
      </Alert>
    );
  }

  return null;
};

export default withRouter(AlertBox);
