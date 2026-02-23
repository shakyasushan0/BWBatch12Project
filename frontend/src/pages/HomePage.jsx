import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  useEffect(() => {
    axios
      .get("/api/products")
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <button>Click</button>
    </>
  );
}

export default HomePage;
