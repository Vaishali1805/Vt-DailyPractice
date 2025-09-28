import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
      type: String,
      trim: true,
    },
    productImage: {
      type: String,
      trim: true,
    },
    productDescription: {
      type: String,
      trim: true,
    },
    productPrice: {
      type: Number,
      min: 0,
    },
    stock: { 
      type: Number, 
      default: 1,
      min: 0, 
    }
})

const productModel = mongoose.model('product',productSchema);
export default productModel;