import { eq } from "drizzle-orm";
import db from "../../db/index.js";
import { productsTable } from "../../db/schemas/product.js";

export const createProductService = async (data) => {
  const [result] = await db.insert(productsTable).values(data);
  return await getProductByIdService(result.insertId);
};

export const getAllProductsService = async () => {
  return await db.select().from(productsTable);
};

export const getProductByIdService = async (id) => {
  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id));
  return product || null;
};

export const updateProductService = async (id, data) => {
  await db
    .update(productsTable)
    .set(data)
    .where(eq(productsTable.id, id));

  return await getProductByIdService(id);
};

export const deleteProductService = async (id) => {
  const [deleted] = await db
    .delete(productsTable)
    .where(eq(productsTable.id, id));
  return deleted;
};