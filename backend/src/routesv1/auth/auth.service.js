import { eq } from "drizzle-orm";
import db from "../../db/index.js";
import { usersTable } from "../../db/schemas/user.js";
import { issueJWT } from "./passport-conf/auth.js";
import ApiError from "../../error/ApiError.js";
import bcrypt from "bcryptjs";

export default class AuthService {
  
  async signup(name, email, password, phone) {
    // Check if user already exists
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser) {
      throw new ApiError(409, "Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.insert(usersTable).values({
      name,
      email,
      phone,
      password: hashedPassword,
      user_type: "user",
    });

    const [newUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, result.insertId));

    return newUser;
  }

  async login(user) {
    return issueJWT(user);
  }

  async adminLogin(user) {
    return issueJWT({ ...user, user_type: "admin", isAdmin: true });
  }
}