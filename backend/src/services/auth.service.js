import {
  getUserByUsername,
  updateUserPassword,
} from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { comparePasswords, hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

export const login = async (username, password) => {
  const user = await getUserByUsername(username);
  if (!user) throw new ApiError(401, "Kullanıcı bulunamadı");

  const isMatch = await comparePasswords(password, user.passwordHash);
  if (!isMatch) throw new ApiError(401, "Kullanıcı Adı veya Şifre hatalı");

  return generateToken({ id: user.id, username: user.username });
};

export const changePassword = async (username, oldPassword, newPassword) => {
  const user = await getUserByUsername(username);
  if (!user) throw new ApiError(401, "Kullanıcı bulunamadı");

  const isMatch = await comparePasswords(oldPassword, user.passwordHash);
  if (!isMatch) throw new ApiError(400, "Eski şifre hatalı");

  const newHash = await hashPassword(newPassword);
  await updateUserPassword(username, newHash);
};
