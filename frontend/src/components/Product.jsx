import { Card } from "react-bootstrap";
import { Link } from "react-router";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Card.Title as="div" className="product-title">
          <Link to={`/product/${product._id}`}>
            <strong>{product.name}</strong>
          </Link>
        </Card.Title>
        <Card.Text as="div">
          <Rating value={product.rating} text={product.numReviews} />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
