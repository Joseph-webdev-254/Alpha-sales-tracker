
import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  soldAt: {
    type: Date,
    default: Date.now,
  },
});

const Sale = mongoose.model("sales", saleSchema);
export default Sale;

