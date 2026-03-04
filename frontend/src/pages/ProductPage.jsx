import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import {
  Image,
  Row,
  Col,
  ListGroup,
  Card,
  Badge,
  Button,
  Form,
} from "react-bootstrap";
import axios from "axios";
import Rating from "../components/Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductPage() {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  return (
    <>
      <Link to="/" className="btn btn-light">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="danger">{error?.data?.message || error?.error}</Message>
      ) : (
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
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Qty</strong>
                      </Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1}>{x + 1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    variant="dark"
                    disabled={!product.countInStock}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default ProductPage;
