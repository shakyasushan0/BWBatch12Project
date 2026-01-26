import express from "express";
import {
  getProducts,
  addProduct,
  getProductById,
  addReview,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import checkAuth from "../middleware/checkauth.middleware.js";
import checkAdmin from "../middleware/checkadmin.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", checkAuth, checkAdmin, addProduct);
router.get("/:id", getProductById);
router.put("/:id", checkAuth, checkAdmin, updateProduct);
router.delete("/:id", checkAuth, checkAdmin, deleteProduct);
router.post("/:id/addreview", checkAuth, addReview);

export default router;
