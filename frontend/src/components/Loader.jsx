import { Spinner } from "react-bootstrap";

function Loader({ width = "100px", height = "100px" }) {
  return (
    <Spinner
      animation="border"
      style={{
        width,
        height,
        display: "block",
        margin: "auto",
      }}
    ></Spinner>
  );
}
export default Loader;
