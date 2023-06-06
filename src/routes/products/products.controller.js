import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { storeProducts, getProducts } from "../../models/products.model.js";
import { resetFetchBulkWriteResult, updateFetchBulkWriteResult } from "../../shared/bulkWriteResponse.js";
import { buildShopifyLink } from "../../shared/buildShopifyLink.js";

const rutterShopifyURL = process.env.RUTTER_SHOPIFY_URL;
const token = process.env.TOKEN_RUTTER_SHOPIFY_URL;
let bulkWriteResult;

export async function httpFetchProducts(req, res) {
  try {
    bulkWriteResult = resetFetchBulkWriteResult();
    let { limit } = req.query;
    if (!limit || limit > 50) limit = 50;
    await fetchProductsFromShopify(`${rutterShopifyURL}/products.json?limit=${limit}`, token);
    const response = {
      message: "Products fetched successfully from Rutter Shopify!",
      result: bulkWriteResult,
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
    await fetchProductsFromShopify(buildShopifyLink(headers), shopifyToken);
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
  bulkWriteResult = updateFetchBulkWriteResult(bulkWriteResult, response);
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
