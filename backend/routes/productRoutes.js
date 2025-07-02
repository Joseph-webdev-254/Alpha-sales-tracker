import express from "express";
import {
  createProduct,
  recordSale,
  getProductNames,
} from "../controllers/sales.js";

const router = express.Router();
router.post("/createProduct", createProduct);
router.post("/record", recordSale);
router.get("/productNames", getProductNames);
export default router;
