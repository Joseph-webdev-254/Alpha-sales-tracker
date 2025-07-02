import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
try {
  await mongoose.connect("mongodb://localhost:27017/alpha");
  console.log("connected to mongodb");
} catch (error) {
  console.error("could  not  connetct to database");
}

app.use("/", productRoutes);
app.listen(5000, console.log("server on "));
