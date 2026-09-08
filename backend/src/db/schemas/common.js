import { serial, timestamp } from "drizzle-orm/mysql-core";

export const createdAt = timestamp("created_at").notNull().defaultNow();
export const updatedAt = timestamp("updated_at")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date()); 
  
export const id = serial("id").primaryKey();
