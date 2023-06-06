import express from "express";
import { fetchProducts, getProducts } from "./products.controller.js";

const productsRouter = express.Router();

productsRouter.get("/fetch", fetchProducts);
productsRouter.get("/", getProducts);

export default productsRouter;
