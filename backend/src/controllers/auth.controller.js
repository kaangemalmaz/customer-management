import { messages } from "../constants/messages.js";
import { login, changePassword } from "../services/auth.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";

export const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new ApiError(400, messages.auth.usernamePasswordRequired);
    }

    const token = await login(username, password);
    res
      .status(200)
      .json(ApiSuccess.response(messages.auth.loginSuccess, { token }));
  } catch (error) {
    next(error);
  }
};

export const userChangePassword = async (req, res, next) => {
  try {
    const username = req.user.username;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new ApiError(400, messages.auth.oldNewPasswordRequired);
    }

    await changePassword(username, oldPassword, newPassword);
    res.status(200).json(ApiSuccess.response(messages.auth.passwordChanged));
  } catch (error) {
    next(error);
  }
};
