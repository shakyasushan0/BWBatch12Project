import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    console.log(req.user);
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) return res.send(product);
  res.status(404).send({ error: "Product not found" });
};

const addProduct = async (req, res) => {
  console.log(req.user);
  const product = {
    name: "Sample Name",
    description: "Sample Description",
    price: 0,
    brand: "Sample Brand",
    category: "Sample Category",
  };
  const addedProduct = await Product.create(product);
  res.send({ message: "Product added!", product: addedProduct });
};

export { getProducts, addProduct, getProductById };
