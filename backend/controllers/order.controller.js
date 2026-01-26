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

export { addOrder };
