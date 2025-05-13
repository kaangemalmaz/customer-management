import { db } from "../config/db.js";
import { User } from "../entities/user.entity.js";
import { ApiError } from "../utils/ApiError.js";

export async function getUserByUsername(username) {
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const row = result.rows[0];
    if (!row) return null;

    return new User({
      id: row.id,
      username: row.username,
      passwordHash: row.password_hash,
    });
  } catch (error) {
    throw new ApiError(
      500,
      "User bilgisi çekilirken hata oluştu.",
      error.detail
    );
  }
}

export async function updateUserPassword(username, passwordHash) {
  try {
    await db.query("UPDATE users SET password_hash = $1 WHERE username = $2", [
      passwordHash,
      username,
    ]);
  } catch (error) {
    throw new ApiError(
      500,
      "Şifre değişimi sırasında hata oluştu.",
      error.detail
    );
  }
}
