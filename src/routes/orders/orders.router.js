import express from "express";
import { httpFetchOrders, httpGetOrders } from "./orders.controller.js";

const ordersRouter = express();

ordersRouter.get("/fetch", httpFetchOrders);
ordersRouter.get("/", httpGetOrders);

export default ordersRouter;
