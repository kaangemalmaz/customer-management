import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./src/routes/auth.route.js";
import customerRoutes from "./src/routes/customer.route.js";
import { setupSwagger } from "./src/docs/swagger.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import { initializeDatabase } from "./src/config/dbInit.js";

const app = express();

app.use(cors());
app.use(express.json());

await initializeDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

app.use(errorMiddleware);

setupSwagger(app);
export default app;
