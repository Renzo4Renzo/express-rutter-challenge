import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { storeOrders, getOrders } from "../../models/orders.model.js";

const rutterShopifyURL = process.env.RUTTER_SHOPIFY_URL;
const token = process.env.TOKEN_RUTTER_SHOPIFY_URL;
let fetchOrdersBulkWriteResult;

export async function httpFetchOrders(req, res) {}

export async function httpGetOrders(req, res) {
  try {
    const ordersPaginated = await getOrders(req.query);
    const transformedOrders = ordersPaginated.orders.map((order) => {
      return {
        id: order.id,
        platform_id: order.platform_id.toString(),
        line_items: order.line_items,
      };
    });
    return res.status(200).json({ ...ordersPaginated, orders: transformedOrders });
  } catch (error) {
    return res.status(400).json({ message: "There was an error retrieving the orders!", errors: error.message });
  }
}
