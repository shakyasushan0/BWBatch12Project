import { Row, Col, Button, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { Link } from "react-router";

function ProductListPage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [createProduct, {}] = useCreateProductMutation();
  const [deleteProduct, {}] = useDeleteProductMutation();
  const createProductHandler = async () => {
    try {
      const res = await createProduct().unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      if (window.confirm("Are you sure you want to delete product?")) {
        const res = await deleteProduct({ productId }).unwrap();
        toast.success(res.message);
      }
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <Button
            variant="dark"
            className="btn-sm"
            onClick={createProductHandler}
          >
            <FaEdit style={{ marginTop: "-5px" }} /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="danger">{error?.data?.error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>BRAND</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>
                  <Button
                    variant="success"
                    className="btn-sm mx-2"
                    as={Link}
                    to={`/admin/product/${product._id}/edit`}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <FaTrash />
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

export default ProductListPage;
