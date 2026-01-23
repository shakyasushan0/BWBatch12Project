import express from "express";
import {
  getProducts,
  addProduct,
  getProductById,
} from "../controllers/product.controller.js";
import checkAuth from "../middleware/checkauth.middleware.js";
import checkAdmin from "../middleware/checkadmin.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", checkAuth, checkAdmin, addProduct);
router.get("/:id", getProductById);

export default router;
