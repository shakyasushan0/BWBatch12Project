import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router";
import { addToCart, clearCart, removeFromCart } from "../slices/cartSlice";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateCartHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Row>
      <Col md={8}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty. <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>
                      <strong>{item.name}</strong>
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        updateCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <Button
              variant="dark"
              className="my-3"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </h3>
              <h5>
                $
                {Number(
                  cartItems.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0,
                  ),
                ).toFixed(2)}
              </h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="dark"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/signin?redirect=/shipping")}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartPage;
