import { eq } from "drizzle-orm";
import db from "../../db/index.js";
import { categoriesTable } from "../../db/schemas/categories.js";

export const createCategoryService = async (data) => {
  const [newCategory] = await db.insert(categoriesTable).values(data);
  return newCategory;
};

export const getAllCategoriesService = async () => {
  return await db.select().from(categoriesTable);
};

export const getCategoryByIdService = async (id) => {
  const [category] = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.id, id));
  return category || null;
};

export const updateCategoryService = async (id, data) => {
  await db
    .update(categoriesTable)
    .set(data)
    .where(eq(categoriesTable.id, id));

  return await getCategoryByIdService(id);
};

export const deleteCategoryService = async (id) => {
  const [deleted] = await db
    .delete(categoriesTable)
    .where(eq(categoriesTable.id, id));
  return deleted;
};