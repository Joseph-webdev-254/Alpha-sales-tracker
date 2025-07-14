import productModel from "../models/Database.js";
import Sale from "../models/salesModel.js";
export const createProduct = async (req, res) => {
  const { productName, productQuantity, buyingPrice, sellingPrice } = req.body;

  try {
    const product = await productModel.findOne({ productName });
    const newBatch = {
      productQuantity,
      buyingPrice,
      sellingPrice,
    };

    if (product) {
      product.stock.push(newBatch);
      await product.save();
      res.json({ message: "Product updated", product });
    } else {
      const newProduct = await productModel.create({
        productName,
        stock: [newBatch],
      });
      res.status(201).json({
        message: "Product created",
        newProduct,
      });
    }
  } catch (error) {
    console.error("Error in createProduct:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const recordSale = async (req, res) => {
  const results = [];
  try {
    //force array structure
    let sales = Array.isArray(req.body) ? req.body : [req.body];

    // Validate structure
    if (!sales.every((sale) => sale.productName && sale.quantity)) {
      return res.status(400).json({ error: "Invalid sales data format" });
    }

    for (const sale of sales) {
      const { productName, quantity } = sale;

      const product = await productModel.findOne({ productName });

      if (!product) {
        results.push({ productName, status: "not found" });
        continue;
      }

      let qtyToSubtract = quantity;
      const stock = product.stock;

      for (let i = 0; i < stock.length && qtyToSubtract > 0; i++) {
        const batch = stock[i];
        const available = parseFloat(batch.productQuantity);
        if (available <= 0) continue;

        if (available >= qtyToSubtract) {
          batch.productQuantity = (available - qtyToSubtract).toFixed(2);
          qtyToSubtract = 0;
        } else {
          batch.productQuantity = 0;
          qtyToSubtract -= available;
        }
      }

      if (qtyToSubtract > 0) {
        results.push({ productName, status: "insufficient stock" });
        continue;
      }

      await product.save();
      results.push({ productName, status: "updated" });
    }
    res.json({ message: "sales recorded", results });
  } catch (error) {
    console.error("Error recording sales:", error);
    res.status(500).json({ error: "Failed to record sales" });
  }
};

export const getProductNames = async (req, res) => {
  try {
    const products = await productModel.find({}, "productName");
    const names = products.map((product) => product.productName);
    res.json(names);
  } catch (error) {
    console.error("Error fetching product names:", error);
    res.status(500).json({ error: "Failed to fetch product names" });
  }
};
export const bulkSalesRecords = async (req, res) => {
  try {
    const rawSales = Array.isArray(req.body) ? req.body : [req.body];

    if (!rawSales.every((sale) => sale.productName && sale.quantity)) {
      return res.status(400).json({ error: "Invalid sales format" });
    }

    const merged = {};
    for (const { productName, quantity } of rawSales) {
      const name = productName.trim();
      merged[name] = (merged[name] || 0) + Number(quantity);
    }

    const results = [];

    for (const [productName, quantity] of Object.entries(merged)) {
      const product = await productModel.findOne({ productName });

      if (!product) {
        results.push({ productName, status: "not found" });
        continue;
      }

      let qtyToSubtract = quantity;
      const stock = product.stock;

      for (let i = 0; i < stock.length && qtyToSubtract > 0; i++) {
        const batch = stock[i];
        const available = parseFloat(batch.productQuantity);
        if (available <= 0) continue;

        if (available >= qtyToSubtract) {
          batch.productQuantity = (available - qtyToSubtract).toFixed(2);
          qtyToSubtract = 0;
        } else {
          batch.productQuantity = 0;
          qtyToSubtract -= available;
        }
      }

      if (qtyToSubtract > 0) {
        results.push({ productName, status: "insufficient stock" });
        continue;
      }

      await product.save();

      // ✅ Correct model name used here
      const sale = new Sale({
        productName,
        quantity,
      });

      await sale.save();
      results.push({ productName, status: "sale recorded" });
    }

    res.json({ message: "Bulk sales recorded", results });
  } catch (error) {
    console.error("Error in bulkSalesRecords:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const getSalesPrices = async (req, res) => {
  const { productName } = req.body;

  if (!productName) {
    return res.status(400).json({ error: "Product name is required" });
  }

  try {
    const product = await productModel.findOne({ productName });

    if (!product || !product.stock || product.stock.length === 0) {
      return res
        .status(404)
        .json({ error: "Product not found or has no stock" });
    }

    const latestBatch = product.stock[product.stock.length - 1];
    const pricePerKG = parseFloat(latestBatch.sellingPrice);

    res.json({ pricePerKG });
  } catch (error) {
    console.error("Error in getSellingPrice:", error);
    res.status(500).json({ error: "Server error" });
  }
};
