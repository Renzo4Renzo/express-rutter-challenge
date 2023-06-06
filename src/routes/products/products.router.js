import express from "express";
import { httpFetchProducts, httpGetProducts } from "./products.controller.js";

const productsRouter = express.Router();

productsRouter.get("/fetch", httpFetchProducts);
productsRouter.get("/", httpGetProducts);

export default productsRouter;
