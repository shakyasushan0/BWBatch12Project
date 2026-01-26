import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        image: { type: String },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      city: { type: String, required: true },
      address: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      contactNumber: { type: String, required: true },
    },
    itemPrice: { type: Number, required: true },
    taxPrice: { type: Number },
    shippingCharge: { type: Number, default: 5 },
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, default: "cod" },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidAt: { type: String },
    deleiveredAt: { type: String },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
