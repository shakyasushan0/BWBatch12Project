import { Alert } from "react-bootstrap";

function Message({ type = "info", children }) {
  return <Alert variant={type}>{children}</Alert>;
}

export default Message;
