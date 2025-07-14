import mongoose from "mongoose";

try {
  await mongoose.connect("mongodb://localhost:27017/alpha");
  console.log("connected  to  the  data base");
} catch (error) {
  console.error("could not  connect to the  database");
}

const batchSchema = new mongoose.Schema({
  productQuantity: {
    type: Number,
    required: true,
  },
  buyingPrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true, // Ensure product names are unique
  },
  stock: [batchSchema],
});

const productModel = mongoose.model("products", productSchema);
export default productModel;
