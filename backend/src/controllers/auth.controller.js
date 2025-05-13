import { login, changePassword } from "../services/auth.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";

export const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new ApiError(400, "Kullanıcı adı ve şifre zorunludur");
    }

    const token = await login(username, password);
    res.status(200).json(ApiSuccess.response("Giriş başarılı", { token }));
  } catch (error) {
    next(error);
  }
};

export const userChangePassword = async (req, res, next) => {
  try {
    const username = req.user.username;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new ApiError(400, "Eski ve yeni şifre zorunludur");
    }

    await changePassword(username, oldPassword, newPassword);
    res.status(200).json(ApiSuccess.response("Şifre başarıyla güncellendi"));
  } catch (error) {
    next(error);
  }
};
