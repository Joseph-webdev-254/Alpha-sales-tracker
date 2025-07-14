import express from "express";
import {
  createProduct,
  recordSale,
  getProductNames,
  getSalesPrices,
} from "../controllers/sales.js";

const router = express.Router();
router.post("/createProduct", createProduct);
router.post("/record", recordSale);
router.get("/productNames", getProductNames);
router.post("/productprices", getSalesPrices);
export default router;
