import { Table, Button } from "react-bootstrap";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router";

function OrderListPage() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="danger">{error?.data?.error}</Message>
      ) : (
        <Table responsive hover striped className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>USER</th>
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
                <td>{order.user.name}</td>
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
                  <Button
                    variant="dark"
                    className="btn-sm"
                    as={Link}
                    to={`/order/${order._id}`}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default OrderListPage;
