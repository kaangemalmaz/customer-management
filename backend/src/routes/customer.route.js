import express from "express";
import {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";

import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateJWT);
router.get("/", getCustomers);
router.post("/", createCustomer);
router.put("/", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
