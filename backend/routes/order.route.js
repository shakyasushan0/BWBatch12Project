import express from "express";
import { addOrder } from "../controllers/order.controller.js";
import checkAuth from "../middleware/checkauth.middleware.js";

const router = express.Router();

router.post("/", checkAuth, addOrder);

export default router;
