import dotenv from "dotenv";
import express from "express";
import cors from "cors";


import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import dashboardRoutes from "./src/routes/dashboard.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Inventory API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});