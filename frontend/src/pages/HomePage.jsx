import { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productApiSlice";

function HomePage() {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("/api/products") // http://localhost:5173
  //     .then((resp) => setProducts(resp.data))
  //     .catch((err) => console.log(err.message));
  // }, []);
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      <h2>Latest Products</h2>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h2>{error?.data?.message || error?.error}</h2>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default HomePage;
