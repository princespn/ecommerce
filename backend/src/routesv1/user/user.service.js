import { eq } from "drizzle-orm";
import db from "../../db/index.js";
import {usersTable } from "../../db/schemas/index.js";
import bcrypt from "bcryptjs";

export default class UserService {
  async getUserById(userId) {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    return user;
  }

  async updateUserDetails(userId, userDetails) {
    let detailsChangedUserId;
    if (userDetails.password) {
      const hasedPassword = await bcrypt.hash(userDetails.password, 10);
      detailsChangedUserId = await db
        .update(usersTable)
        .set({ ...userDetails, role: "USER", password: hasedPassword })
        .where(eq(usersTable.id, userId));
    } else {
      detailsChangedUserId = await db
        .update(usersTable)
        .set({ ...userDetails, role: "USER" })
        .where(eq(usersTable.id, userId));
    }

    return detailsChangedUserId;
  }

  
}
