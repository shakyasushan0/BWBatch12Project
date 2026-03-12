import { Form, Button } from "react-bootstrap";
import { Link, useParams } from "react-router";
import FormContainer from "../../components/FormContainer";
import { useEffect, useState } from "react";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

function ProductEditPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const [updateProduct, {}] = useUpdateProductMutation();
  const { id } = useParams();

  const { data: product } = useGetProductByIdQuery(id);
  const [uploadProductImage, { isLoading }] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImage(product.image);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
    }
  }, [product]);

  const updateProductHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct({
        name,
        price,
        image,
        brand,
        category,
        description,
        _id: product._id,
      }).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };

  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };
  return (
    <>
      <Button as={Link} to="/admin/products" variant="light">
        Go Back
      </Button>
      <FormContainer>
        <h3>Edit</h3>
        <Form onSubmit={updateProductHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="price" className="my-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image Url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.Control
              type="file"
              onChange={uploadImageHandler}
              disabled={isLoading}
            />
            {isLoading && <Loader width="25px" height="25px" />}
          </Form.Group>
          <Form.Group controlId="brand" className="my-2">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="category" className="my-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description" className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="my-2" variant="dark">
            Edit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default ProductEditPage;
