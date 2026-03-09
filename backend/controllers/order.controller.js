import Order from "../models/Order.js";
import crypto from "crypto";

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
  const order = await Order.findById(id).populate("user", "name email");
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
  order.deliveredAt = Date.now();
  await order.save();
  res.send({ message: "Order delivered!" });
};

const getPaymentDetails = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ error: "Order not found" });
  const details = {
    amount: order.itemPrice,
    tax_amount: order.taxPrice,
    total_amount: order.totalPrice,
    transaction_uuid: order._id,
    product_code: "EPAYTEST",
    product_service_charge: 0,
    product_delivery_charge: order.shippingCharge,
    success_url: "http://localhost:3000/api/order/confirm-payment",
    failure_url: "http://localhost:5173/order/" + order._id,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: crypto
      .createHmac("sha256", "8gBm/:&EnhH.1/q")
      .update(
        `total_amount=${order.totalPrice},transaction_uuid=${order._id},product_code=EPAYTEST`,
      )
      .digest("base64"),
  };
  res.send({ details });
};

export {
  addOrder,
  getMyOrders,
  getOrders,
  getOrderById,
  payOrder,
  deliverOrder,
  getPaymentDetails,
};
