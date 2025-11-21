import { model, Schema } from "mongoose";
import type { Iitem } from "../types/item.type.ts";

const itemSchema = new Schema<Iitem>({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
});

export const ItemModel = model("Item", itemSchema);
