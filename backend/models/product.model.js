import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, default: 'General' },
  price: { type: Number, required: true },
  oldPrice: { type: Number }, 
  isNewArrival: { type: Boolean, default: false },
  description: { type: String },
  image: { type: String,default: "/images/chair.jpg"  },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;