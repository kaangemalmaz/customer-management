import {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
  findCustomerByNationalId,
} from "../repositories/customer.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const addCustomer = async (data) => {
  const { firstName, lastName, nationalId } = data;

  if (!/^\d{11}$/.test(nationalId)) {
    throw new ApiError(400, "TC Kimlik Numarası 11 haneli olmalıdır");
  }

  const existingNationalId = await findCustomerByNationalId(nationalId);
  if (existingNationalId) {
    throw new ApiError(
      400,
      "Bu TC Kimlik Numarası ile kayıtlı bir müşteri zaten var"
    );
  }

  const registerDate = new Date().toISOString();
  return await createCustomer({
    firstName,
    lastName,
    nationalId,
    registerDate,
  });
};

export async function listCustomers() {
  return await getAllCustomers();
}

export async function editCustomer(id, data) {
  if (isNaN(id)) {
    throw new ApiError(400, "Geçersiz müşteri ID");
  }

  const customer = await getCustomerById(id);
  if (!customer) {
    throw new ApiError(404, "Güncellenecek müşteri bulunamadı");
  }

  return await updateCustomer(id, data);
}

export async function removeCustomer(id) {
  return await deleteCustomer(id);
}
