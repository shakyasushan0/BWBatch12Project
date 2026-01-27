import Order from "../models/Order.js";

const addOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    totalPrice,
    shippingCharge,
  } = req.body;
  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    totalPrice,
    shippingCharge,
  });
  res.send({ message: "Order created!", orderId: order._id });
};

const getMyOrders = async (req, res) => {
  const user = req.user._id;
  const orders = await Order.find({ user });
  res.send(orders);
};

const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
};

const getOrderById = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: "Order not found" });
  res.send(order);
};

const payOrder = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: "Order not found" });
  order.isPaid = true;
  order.paidAt = Date.now();
  await order.save();
  res.send({ message: "Order paid successfully!" });
};

const deliverOrder = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: "Order not found" });
  order.isDelivered = true;
  order.deliveredAt = new Date().toISOString();
  await order.save();
  res.send({ message: "Order delivered!" });
};

export {
  addOrder,
  getMyOrders,
  getOrders,
  getOrderById,
  payOrder,
  deliverOrder,
};
