import {
  Row,
  Col,
  Button,
  ListGroup,
  Badge,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link, useNavigate } from "react-router";
import { usePlaceOrderMutation } from "../slices/orderApiSlice";
import { toast } from "react-toastify";
import { clearCart } from "../slices/cartSlice";

function PlaceOrderPage() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [placeOrder, { isLoading: orderLoading }] = usePlaceOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await placeOrder({
        orderItems: cart.cartItems,
        itemPrice: cart.itemPrice,
        shippingCharge: cart.shippingCharge,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
      }).unwrap();
      dispatch(clearCart());
      toast.success(res.message);
      navigate("/order/" + res.orderId);
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>{" "}
                {cart.paymentMethod == "cod" ? (
                  <Badge>Cash on Delivery</Badge>
                ) : (
                  <Badge bg="success">E-sewa</Badge>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Items</h2>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item._id}`}>
                          <strong>{item.name}</strong>
                        </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} X ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Item</Col>
                  <Col>${cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingCharge}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="dark" onClick={placeOrderHandler}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderPage;
