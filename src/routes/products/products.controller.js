import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { storeProducts, getProducts } from "../../models/products.model.js";

const rutterShopifyURL = process.env.RUTTER_SHOPIFY_URL;
const token = process.env.TOKEN_RUTTER_SHOPIFY_URL;
let fetchProductsBulkWriteResult;

export async function httpFetchProducts(req, res) {
  try {
    resetFetchProductsBulkWriteResult();
    let { limit } = req.query;
    if (!limit || limit > 50) limit = 50;
    await fetchProductsFromShopify(`${rutterShopifyURL}/products.json?limit=${limit}`, token);
    const response = {
      message: "Products fetched successfully from Rutter Shopify!",
      result: fetchProductsBulkWriteResult,
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "There was an error fetching the products!", errors: error.message });
  }
}

async function fetchProductsFromShopify(shopifyURL, shopifyToken) {
  const { data, headers } = await axios.get(shopifyURL, {
    headers: {
      "X-Shopify-Access-Token": shopifyToken,
    },
  });
  await storeFetchedProducts(data);
  if (headers.link && headers.link.includes(`rel="next"`)) {
    let startIndex;
    if (headers.link.includes(`rel="previous",`)) {
      startIndex = headers.link.indexOf(`rel="previous"`) + 15;
    }
    const shopifyLink = headers.link
      .slice(startIndex)
      .split(";")[0]
      .replace(/[\<\>]/g, "");

    await fetchProductsFromShopify(shopifyLink, shopifyToken);
  }
}

async function storeFetchedProducts(fetchedData) {
  const transformedProducts = fetchedData.products.map((product) => {
    return {
      id: uuidv4(),
      platform_id: product.id,
      title: product.title,
    };
  });
  const response = await storeProducts(transformedProducts);
  updateFetchProductsBulkWriteResult(response);
}

export async function httpGetProducts(req, res) {
  try {
    const productsPaginated = await getProducts(req.query);
    const transformedProducts = productsPaginated.products.map((product) => {
      return {
        id: product.id,
        name: product.title,
        platform_id: product.platform_id.toString(),
      };
    });
    return res.status(200).json({ ...productsPaginated, products: transformedProducts });
  } catch (error) {
    return res.status(400).json({ message: "There was an error retrieving the products!", errors: error.message });
  }
}

function updateFetchProductsBulkWriteResult(response) {
  fetchProductsBulkWriteResult = {
    insertedCount: fetchProductsBulkWriteResult.insertedCount + response.insertedCount,
    matchedCount: fetchProductsBulkWriteResult.matchedCount + response.matchedCount,
    modifiedCount: fetchProductsBulkWriteResult.modifiedCount + response.modifiedCount,
    deletedCount: fetchProductsBulkWriteResult.deletedCount + response.deletedCount,
    upsertedCount: fetchProductsBulkWriteResult.upsertedCount + response.upsertedCount,
  };
}

function resetFetchProductsBulkWriteResult() {
  fetchProductsBulkWriteResult = {
    insertedCount: 0,
    matchedCount: 0,
    modifiedCount: 0,
    deletedCount: 0,
    upsertedCount: 0,
  };
}
