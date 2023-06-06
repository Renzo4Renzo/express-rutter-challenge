import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { storeOrders, getOrders } from "../../models/orders.model.js";
import { findProductByPlatformId } from "../../models/products.model.js";
import { resetFetchBulkWriteResult, updateFetchBulkWriteResult } from "../../shared/bulkWriteResponse.js";
import { buildShopifyLink } from "../../shared/buildShopifyLink.js";

const rutterShopifyURL = process.env.RUTTER_SHOPIFY_URL;
const token = process.env.TOKEN_RUTTER_SHOPIFY_URL;
let bulkWriteResult;

export async function httpFetchOrders(req, res) {
  try {
    bulkWriteResult = resetFetchBulkWriteResult();
    const orderLimit = process.env.ORDER_FETCH_LIMIT;
    await fetchOrdersFromShopify(`${rutterShopifyURL}/orders.json?limit=${orderLimit}`, token);
    const response = {
      message: "Orders fetched successfully from Rutter Shopify!",
      result: bulkWriteResult,
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "There was an error fetching the orders!", errors: error.message });
  }
}

async function fetchOrdersFromShopify(shopifyURL, shopifyToken) {
  const { data, headers } = await axios.get(shopifyURL, {
    headers: {
      "X-Shopify-Access-Token": shopifyToken,
    },
  });
  await storeFetchedOrders(data);
  if (
    headers.link &&
    headers.link.includes(`rel="next"`) &&
    bulkWriteResult.modifiedCount < maxOrdersToFetch &&
    bulkWriteResult.upsertedCount < maxOrdersToFetch
  ) {
    await fetchOrdersFromShopify(buildShopifyLink(headers), shopifyToken);
  }
}

async function storeFetchedOrders(fetchedData) {
  const transformedOrders = await Promise.all(
    fetchedData.orders.map(async (order) => {
      return {
        id: uuidv4(),
        platform_id: order.id,
        line_items: await storeLineItems(order.line_items),
      };
    })
  );
  const response = await storeOrders(transformedOrders);
  bulkWriteResult = updateFetchBulkWriteResult(bulkWriteResult, response);
}

async function storeLineItems(lineItems) {
  const gatheredLineItems = await Promise.all(
    lineItems.map(async (lineItem) => {
      const productFound = await findProductByPlatformId(lineItem.product_id);
      if (productFound) return (lineItem = { product_id: productFound.id });
      else return (lineItem = { product_id: null });
    })
  );
  const transformedLineItems = [
    ...new Map(gatheredLineItems.map((lineItem) => [lineItem.product_id, lineItem])).values(),
  ];
  return transformedLineItems;
}

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
