import {
    boolean,
    int,
    mysqlEnum,
    mysqlTable,
    timestamp,
    varchar,
  } from "drizzle-orm/mysql-core";
  import { createdAt, id, updatedAt } from "./common.js";
  import { createInsertSchema } from "drizzle-zod";
  
  export const usersTable = mysqlTable("users", {
    id,
    name: varchar({ length: 255 }),
    gender: varchar({ length: 255 }),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 500 }).notNull(),
    phone: varchar({ length: 20 }).notNull(),
    emailVerified: boolean("email_verified").default(false),
    profileImage: varchar("profile_image", { length: 500 }),
    emailVerifiedAt: timestamp("email_verified_at").default(null),
    status: mysqlEnum(["active", "inactive"]).default("active"),
    user_type: mysqlEnum(["user", "admin"]).default("user"),
    createdAt,
    updatedAt,
  });
  
  export const insertUserValidator = createInsertSchema(usersTable);
  