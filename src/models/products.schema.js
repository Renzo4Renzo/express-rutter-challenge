import { v4 as uuidv4 } from "uuid";

import productModel from "./products.model.js";

export async function fetchProducts() {}

export async function getProducts(filters) {
  const { id, platform_id, title } = filters;
  const maxLimit = Number(process.env.DEFAULT_PAGINATION_LIMIT);
  const limit =
    filters?.limit && Number(filters.limit) > 0 && Number(filters.limit) < maxLimit ? Number(filters.limit) : maxLimit;
  const page = filters?.page && Number(filters.page) > 0 ? Number(filters.page) : 1;

  const productQuery = {
    ...(id && { id }),
    ...(platform_id && { platform_id }),
    ...(title && { title: { $regex: new RegExp(title, "i") } }),
  };

  const productList = await productModel.find(productQuery, null, {
    limit: Number(limit),
    skip: Number(limit) * (Number(page) - 1),
    sort: { title: 1 },
  });
  const totalCount = await productModel.find(productQuery).count();

  return {
    products: productList,
    page: page,
    pageSize: limit,
    totalPages: Math.ceil(limit ? totalCount / limit : 1),
    totalCount: totalCount,
  };
}
