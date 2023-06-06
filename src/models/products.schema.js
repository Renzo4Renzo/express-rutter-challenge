import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    platform_id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Product", productsSchema);
