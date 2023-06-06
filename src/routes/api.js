import express from "express";

import productsRouter from "./products/products.router.js";
import ordersRouter from "./orders/orders.router.js";

const api = express.Router();

api.use("/products", productsRouter);
api.use("/orders", ordersRouter);

export default api;
