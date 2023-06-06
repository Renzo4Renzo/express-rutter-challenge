import mongoose from "mongoose";

const LineItemSchema = new mongoose.Schema({ product_id: String }, { _id: false });

const ordersSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    platform_id: {
      type: Number,
      required: true,
    },
    line_items: {
      type: [LineItemSchema],
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model("Order", ordersSchema);
