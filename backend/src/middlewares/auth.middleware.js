import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return next(new ApiError(401, "Token eksik"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new ApiError(403, "Geçersiz token"));
  }
}
