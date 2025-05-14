import { db } from "../config/db.js";
import { Customer } from "../entities/customer.entity.js";
import { ApiError } from "../utils/ApiError.js";

export async function createCustomer({
  firstName,
  lastName,
  nationalId,
  registerDate,
}) {
  try {
    const result = await db.query(
      `INSERT INTO customers (first_name, last_name, tc_no, register_date)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [firstName, lastName, nationalId, registerDate]
    );
    return result.rows[0];
  } catch (error) {
    throw new ApiError(
      500,
      "Müşteri oluşturulurken bir hata oluştu",
      error.detail
    );
  }
}

export async function getAllCustomers() {
  try {
    const result = await db.query(
      `SELECT * FROM customers ORDER BY register_date DESC`
    );
    return result.rows.map(
      (row) =>
        new Customer({
          id: row.id,
          firstName: row.first_name,
          lastName: row.last_name,
          tcNo: row.tc_no,
          registerDate: row.register_date,
        })
    );
  } catch (error) {
    throw new ApiError(
      500,
      "Müşteri listesi çekilirken bir hata oluştu",
      error.detail
    );
  }
}

export async function getCustomerById(id) {
  try {
    const result = await db.query(`SELECT * FROM customers WHERE id = $1`, [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    throw new ApiError(
      500,
      "Müşteri bilgileri çekilirken bir hata oluştu",
      error.detail
    );
  }
}

export async function updateCustomer(id, fields) {
  try {
    const { firstName, lastName, nationalId } = fields;

    const result = await db.query(
      `UPDATE customers SET first_name = $1, last_name = $2, tc_no = $3 WHERE id = $4 RETURNING *`,
      [firstName, lastName, nationalId, id]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw new ApiError(
      500,
      "Müşteri güncellenirken bir hata oluştu",
      error.detail
    );
  }
}

export async function deleteCustomer(id) {
  try {
    await db.query(`DELETE FROM customers WHERE id = $1`, [id]);
  } catch (error) {
    throw new ApiError(500, "Müşteri silinirken bir hata oluştu", error.detail);
  }
}
