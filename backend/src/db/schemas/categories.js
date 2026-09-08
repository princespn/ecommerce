import {
    int,
    mysqlEnum,
    mysqlTable,
    text,
    varchar,
  } from "drizzle-orm/mysql-core";
  import { createdAt, id, updatedAt } from "./common.js";
  import { createInsertSchema, createSelectSchema } from "drizzle-zod";
  
  export const categoriesTable = mysqlTable("categories", {
    id,
    name: varchar({ length: 255 }).notNull(),
    slug: varchar({ length: 255 }).notNull().unique(),
    description: text(),
    image: varchar({ length: 500 }),
    status: mysqlEnum(["active", "inactive"]).default("active"),
    parentId: int("parent_id"), // For nested/sub-categories
    createdAt,
    updatedAt,
  });
  
  // Zod validation schemas
  export const insertCategoryValidator = createInsertSchema(categoriesTable);
  export const selectCategoryValidator = createSelectSchema(categoriesTable);