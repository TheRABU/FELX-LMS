import express, { type Request, type Response } from "express";
import type { Iitem } from "../types/item.type.ts";
import { ItemModel } from "../models/item.model.ts";
import { Types } from "mongoose";
import { isAdmin } from "../middlewares/isadmin.ts";
const itemRouter = express.Router();

// read items
itemRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items = await ItemModel.find({});

    return res.json({
      items,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error while geting items",
    });
  }
});

// add item
itemRouter.post(
  "/",
  isAdmin,
  async (req: Request<{}, {}, Iitem>, res: Response) => {
    try {
      const { question, options, answer } = req.body;

      if (!question || !options || !answer) {
        return res.json({
          message: "All fields are required",
        });
      }

      const newItem = new ItemModel({
        question,
        options,
        answer,
      });

      await newItem.save();

      return res.status(201).json({
        question,
        options,
        answer,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error while adding item" });
    }
  }
);

// remove item
itemRouter.delete(
  "/",
  isAdmin,
  async (req: Request<{}, {}, { id: Types.ObjectId }>, res: Response) => {
    try {
      const { id } = req.body;

      if (!Types.ObjectId.isValid(id)) {
        return res.json({
          message: "Not a valid id",
        });
      }

      const findItem = await ItemModel.findById(id);

      if (!findItem) {
        return res.json({
          message: "Not found",
        });
      }

      await ItemModel.findByIdAndDelete(id);
      return res.json({
        message: "Item deleted",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error while deleting item" });
    }
  }
);

// update item
// add item
itemRouter.patch(
  "/:id",
  isAdmin,
  async (req: Request<{ id: string }, {}, Iitem>, res: Response) => {
    try {
      const id = req.params.id;
      const { question, options, answer } = req.body;

      if (!Types.ObjectId.isValid(id)) {
        return res.json({
          message: "Not a valid id",
        });
      }

      const findItem = await ItemModel.findById(id);

      if (!findItem) {
        return res.json({
          message: "Not found",
        });
      }

      await ItemModel.findByIdAndUpdate(id, {
        question,
        options,
        answer,
      });

      return res.json({
        message: "Item updated",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error while adding item" });
    }
  }
);

export default itemRouter;
