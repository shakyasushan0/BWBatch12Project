import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  Image,
  Row,
  Col,
  ListGroup,
  Card,
  Badge,
  Button,
} from "react-bootstrap";
import axios from "axios";
import Rating from "../components/Rating";

function ProductPage() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("/api/products/" + id)
      .then((resp) => setProduct(resp.data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <>
      <Link to="/" className="btn btn-light">
        Go Back
      </Link>
      <Row className="my-3">
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>{product.name}</strong>
            </ListGroup.Item>
            <ListGroup.Item>${product.price}</ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Price</strong>
                  </Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Status</strong>
                  </Col>
                  <Col>
                    {product.countInStock ? (
                      <Badge bg="success">In Stock</Badge>
                    ) : (
                      <Badge bg="danger">Out of Stock</Badge>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="dark" disabled={!product.countInStock}>
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductPage;
