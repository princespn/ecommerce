import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs"; // Switched to bcryptjs for consistency
import jwt from "jsonwebtoken";
import db from "../../../db/index.js";
import { eq } from "drizzle-orm";
import { usersTable } from "../../../db/schemas/user.js";
import dotenv from "dotenv";

dotenv.config();

// Local Strategy (Login)
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email));

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Wrong password" });
        }

        // FIX 1: Pass the entire user object, not user.password
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email));

        if (!user) {
          console.log("❌ Authentication failed: User email not found");
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔐 Password Check Result:", isMatch);

        if (!isMatch) {
          console.log("❌ Authentication failed: Password mismatch");
          return done(null, false, { message: "Wrong password" });
        }

        console.log("✅ Authenticated successfully:", user.email);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
// Helper to sign JWT
export const issueJWT = (user) => {
  const payload = {
    id: user.id,
    user_type: user.user_type,
    email: user.email,
    claims: {
      canEdit: user.user_type === "admin",
      canView: true,
    },
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY || "efjaajfpajfkafa",
    { expiresIn: process.env.JWT_EXPIRE_TIME || "1d" }
  );
};