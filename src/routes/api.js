import express from "express";

import productsRouter from "./products/products.router.js";
// const ordersRouter = require("./orders/orders.router");

const api = express.Router();

api.use("/products", productsRouter);
// api.use("/orders", ordersRouter);

export default api;
