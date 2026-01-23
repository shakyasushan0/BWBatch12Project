import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    console.log(req.user);
    const products = await Product.find().populate("user", "name email -_id");
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
  const product = {
    user: req.user._id,
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
