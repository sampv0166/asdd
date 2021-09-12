import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant}>
      {children}
      <strong
        className="mx-3 "
        style={{ cursor: "pointer" }}
        onClick={() => {
          
          window.location.reload();
        }}
      >
        reload
      </strong>
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
