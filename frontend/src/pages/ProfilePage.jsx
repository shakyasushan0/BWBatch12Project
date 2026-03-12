import { useState } from "react";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import Loader from "../components/Loader";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  return (
    <>
      <Row>
        <Col md={5}>
          <h2>Profile</h2>
          <FormContainer>
            <Form>
              <Form.Group className="my-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="name">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="name">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="name">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="dark">Update</Button>
            </Form>
          </FormContainer>
        </Col>
        <Col md={7}>
          <h2>Orders</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message type="danger">{error.data.error}</Message>
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CREATED AT</th>
                  <th>PRICE</th>
                  <th>DELIVERED</th>
                  <th>PAID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substr(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substr(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substr(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/order/${order._id}`}
                        className="btn btn-dark btn-sm"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
}

export default ProfilePage;
