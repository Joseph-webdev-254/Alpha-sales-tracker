import cors from "cors";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", productRoutes);
app.listen(5000, console.log("server on "));
