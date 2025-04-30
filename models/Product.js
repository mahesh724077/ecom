import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  desc:String,
  price:Number,
  picture: String,
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
