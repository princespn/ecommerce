import express from "express";
import dotenv from "dotenv";
import "./db/index.js";
import passport from "passport";
import "./routesv1/auth/passport-conf/auth.js";
import cors from "cors";
import path from "path";
import rootRouter from "./routesv1/root-route.js";
import { errorHandler } from "./middleware/global-error-handler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = [
  "http://127.0.0.1:8080",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:8080",
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("CORS Origin:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

const __dirname = path.resolve(); // Required for ES modules
app.use(express.static(path.join(__dirname, "public"))); // Adjust if dist is elsewhere

app.use("/apiv2", rootRouter);

app.use(errorHandler); //global error handler

app.get("{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html")); 
});

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});

export default app;
