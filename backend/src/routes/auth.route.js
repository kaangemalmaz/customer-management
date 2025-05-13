import express from "express";
import {
  userLogin,
  userChangePassword,
} from "../controllers/auth.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/login", userLogin);
router.post("/change-password", authenticateJWT, userChangePassword);

export default router;
