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

const updateProduct = async (req, res) => {
  const { name, description, image, brand, category, price } = req.body;
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).send({ error: "Product not found!" });
  // Product.findByIdAndUpdate(id, req.body)
  product.name = name || product.name;
  product.description = description || product.description;
  product.image = image || product.image;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.price = price || product.price;

  await product.save();
  res.send({ message: "Product updated!" });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return res.status(404).send({ error: "Product not found!" });
  res.send({ message: "Product deleted" });
};

const addReview = async (req, res) => {
  const { title, comment, rating } = req.body;
  const user = req.user._id;
  const { id: productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).send({ error: "Product not found!" });
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() == user,
  );
  if (alreadyReviewed)
    return res.status(400).send({ error: "Already reviewed!" });
  product.reviews.push({
    title,
    comment,
    rating,
    user,
  });
  product.numReviews += 1;
  const totalRating = product.reviews.reduce((acc, r) => acc + r.rating, 0);
  product.rating = (totalRating / product.numReviews).toFixed(2);
  await product.save();
  res.status(201).send({ message: "Review created!" });
};

export {
  getProducts,
  addProduct,
  getProductById,
  addReview,
  updateProduct,
  deleteProduct,
};
