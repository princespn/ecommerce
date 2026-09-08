import express from "express";
import UserService from "./user.service.js";
import passport from "passport";
import ApiError from "../../error/ApiError.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();

const userService = new UserService();

/**
 * Middlware will authenticate the user and extracts id from token.
 * And sends the user related to the id.
 */
router.get(
  "/get-loggedin-user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.id;
    const user = await userService.getUserById(userId);

    res.status(200).json(user);
  }
);

router.get(
  "/get-loggedin-user-quotes",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.id;
    const user = await userService.getAllLogedInUserQuote(userId);

    res.status(200).json(user);
  }
);
router.post(
  "/update-loggedin-user-details",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.id;
    const userDetails = req.body;
    const user = await userService.updateUserDetails(userId, userDetails);

    res.status(200).json(user);
  }
);

/**
 * Upload documnet
 */

// ===== Setup =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==== Ensure upload folder exists ====
const uploadDir = path.join(__dirname, "../../public/documents");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ==== Multer storage config ====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const userEmail = req.user?.email || "unknown";
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const safeEmail = userEmail.replace(/[^a-zA-Z0-9]/g, "_");
    cb(null, `${safeEmail}_${timestamp}${ext}`);
  },
});

const upload = multer({ storage });
router.post(
  "/upload-ducuments/:quoteId",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  async (req, res) => {
    const quoteId = req.params.quoteId;

    if (quoteId.trim().length == 0) {
      throw new ApiError(
        "Quote Id is required.",
        400,
        "/upload-ducuments/:quoteId"
      );
    }

    if (!req.file) {
      throw new ApiError(
        "File not uploaded.",
        400,
        "/upload-ducuments/:quoteId"
      );
    }

    const userId = req.user.id;
    const userRole = req.user.role;
    const userEmail = req.user?.email || "unknown";
    const filePath = `public/documents/${req.file.filename}`;
    const originalName = req.file.originalname;

    const result = await userService.saveDocument(
      quoteId,
      userId,
      userRole,
      filePath,
      originalName
    );

    return res.status(200).json(result);
  }
);

router.get(
  "/quote-documents/:quoteId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const quoteId = req.params.quoteId;

    if (quoteId.trim().length == 0) {
      throw new ApiError(
        "Quote Id is required.",
        400,
        "/quote-documents/:quoteId"
      );
    }
    const documnts = await userService.getDocuments(quoteId);
    res.status(200).json(documnts);
  }
);

export default router;
