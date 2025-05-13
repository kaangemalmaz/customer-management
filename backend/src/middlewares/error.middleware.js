import { ApiError } from "../utils/ApiError.js";

export function errorMiddleware(err, req, res, next) {
  //console.log(err);

  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err instanceof ApiError ? err.message : "Sunucu hatası";
  const errors = err instanceof ApiError && err.errors ? err.errors : undefined;

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
}
