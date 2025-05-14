import {
  addCustomer,
  listCustomers,
  editCustomer,
  removeCustomer,
} from "../services/customer.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";

export async function createCustomer(req, res, next) {
  try {
    const { firstName, lastName, nationalId } = req.body;

    if (!firstName || !lastName || !nationalId) {
      throw new ApiError(400, "Tüm müşteri bilgileri zorunludur");
    }

    const customer = await addCustomer(req.body);

    res
      .status(201)
      .json(ApiSuccess.response("Müşteri başarıyla oluşturuldu.", customer));
  } catch (error) {
    next(error);
  }
}

export async function getCustomers(req, res, next) {
  try {
    const customers = await listCustomers();
    res
      .status(200)
      .json(
        ApiSuccess.response("Müşteri listesi başarıyla getirildi.", customers)
      );
  } catch (error) {
    next(error);
  }
}

export async function updateCustomer(req, res, next) {
  try {
    const updated = await editCustomer(req.body.id, req.body);
    if (!updated) throw new ApiError(404, "Kayıt bulunamadı");
    res
      .status(200)
      .json(ApiSuccess.response("Müşteri başarıyla güncellendi.", updated));
  } catch (error) {
    next(error);
  }
}

export async function deleteCustomer(req, res, next) {
  try {
    await removeCustomer(req.params.id);
    res.status(200).json(ApiSuccess.response("Müşteri başarıyla silindi."));
  } catch (error) {
    next(error);
  }
}
