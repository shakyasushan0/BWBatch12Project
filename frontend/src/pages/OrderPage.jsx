import { Link, useParams } from "react-router";
import {
  useDeliverOrderMutation,
  useGetEsewaPaymentDetailsQuery,
  useGetOrderByIdQuery,
} from "../slices/orderApiSlice";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Badge,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function OrderPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { data: order, isLoading, error, refetch } = useGetOrderByIdQuery(id);
  const { data: paymentDetails } = useGetEsewaPaymentDetailsQuery(id);
  const [deliverOrder, {}] = useDeliverOrderMutation();
  // console.log(paymentDetails.details);

  const handleEsewaPayment = () => {
    const form = document.createElement("form");
    form.method = "POST"; // form.setAttribute("method", "POST")
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    for (const key in paymentDetails.details) {
      const input = document.createElement("input");
      input.name = key;
      input.setAttribute("value", paymentDetails.details[key]);
      console.log(paymentDetails.details[key]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    // console.log(form);
  };

  const handleOrderDelivery = async () => {
    try {
      const res = await deliverOrder({ orderId: order._id }).unwrap();
      refetch();
      toast.success(res.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };

  return (
    <>
      <h1>Order {id}</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="danger">{error?.data?.error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p className="shipping-text">
                  <strong>Name:</strong> {order.user.name}
                </p>
                <p className="shipping-text">
                  <strong>Contact: </strong>{" "}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p className="shipping-text">
                  <strong>Address: </strong> {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message type="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message type="danger">Not Delivered!</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong>{" "}
                  {order.paymentMethod == "cod" ? (
                    <Badge>Cash on Delivery</Badge>
                  ) : (
                    <Badge bg="success">E-Sewa</Badge>
                  )}
                </p>
                {order.isPaid ? (
                  <Message type="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message type="danger">Not Paid!</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col>
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
                    <Col>${order.itemPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingCharge}</Col>
                  </Row>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {order.paymentMethod != "cod" &&
                  !order.isPaid &&
                  !userInfo.isAdmin && (
                    <ListGroup.Item>
                      <Button variant="dark" onClick={handleEsewaPayment}>
                        Pay via Esewa
                      </Button>
                    </ListGroup.Item>
                  )}
                {userInfo.isAdmin && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      variant="dark"
                      disabled={!order.isPaid}
                      onClick={handleOrderDelivery}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
export default OrderPage;
