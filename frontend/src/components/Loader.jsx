import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner
      animation="border"
      style={{
        width: "100px",
        height: "100px",
        display: "block",
        margin: "auto",
      }}
    ></Spinner>
  );
}
export default Loader;
