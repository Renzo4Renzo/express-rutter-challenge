import ordersSchema from "./orders.schema.js";

export async function storeOrders(orders) {
  const orderQueries = [];
  orders.forEach((order) =>
    orderQueries.push({
      updateOne: {
        filter: { platform_id: order.platform_id },
        update: { ...order },
        upsert: true,
      },
    })
  );
  return await ordersSchema.bulkWrite(orderQueries, {
    ordered: false,
  });
}

export async function getOrders(filters) {
  const { id, platform_id, line_items_ids } = filters;
  const maxLimit = Number(process.env.DEFAULT_PAGINATION_LIMIT);
  const limit =
    filters?.limit && Number(filters.limit) > 0 && Number(filters.limit) < maxLimit ? Number(filters.limit) : maxLimit;
  const page = filters?.page && Number(filters.page) > 0 ? Number(filters.page) : 1;

  const lineItemsIds = line_items_ids && line_items_ids.split(",");

  const orderQuery = {
    ...(id && { id }),
    ...(platform_id && { platform_id }),
    ...(line_items_ids && { "line_items.product_id": { $in: lineItemsIds } }),
  };

  const orderList = await ordersSchema.find(orderQuery, null, {
    limit: Number(limit),
    skip: Number(limit) * (Number(page) - 1),
  });
  const totalCount = await ordersSchema.find(orderQuery).count();

  return {
    orders: orderList,
    page: page,
    pageSize: limit,
    totalPages: Math.ceil(limit ? totalCount / limit : 1),
    totalCount: totalCount,
  };
}
