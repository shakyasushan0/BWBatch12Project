import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "/images/sample.jpg",
    },
    rating: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
