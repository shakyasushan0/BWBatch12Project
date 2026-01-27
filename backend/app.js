import express from "express";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import uploadRouter from "./routes/upload.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/upload", uploadRouter);

export default app;
