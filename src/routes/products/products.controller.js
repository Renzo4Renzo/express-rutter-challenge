import { fetchProducts, getProducts } from "../../models/products.schema.js";

export async function httpFetchProducts(req, res) {
  try {
    return res.status(200).json({ message: "Hi!" });
  } catch (error) {
    return res.status(400).json({ message: "Hi!" });
  }
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
