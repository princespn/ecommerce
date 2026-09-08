import {
    decimal,
    int,
    mysqlEnum,
    mysqlTable,
    text,
    varchar,
  } from "drizzle-orm/mysql-core";
  import { createdAt, id, updatedAt } from "./common.js";
  import { categoriesTable } from "./categories.js";
  import { createInsertSchema, createSelectSchema } from "drizzle-zod";
  
  export const productsTable = mysqlTable("products", {
    id,
    name: varchar({ length: 255 }).notNull(),
    slug: varchar({ length: 255 }).notNull().unique(),
    description: text(),
    price: decimal({ precision: 10, scale: 2 }).notNull(),
    stockQuantity: int("stock_quantity").notNull().default(0),
    sku: varchar({ length: 100 }).unique(),
    featuredImage: varchar("featured_image", { length: 500 }),
    status: mysqlEnum(["draft", "active", "archived"]).default("draft"),
    categoryId: int("category_id")
      .notNull()
      .references(() => categoriesTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  });
  
  // Zod validation schemas
  export const insertProductValidator = createInsertSchema(productsTable);
  export const selectProductValidator = createSelectSchema(productsTable);