import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getOne,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProduct);
router.get("/:id", getOne);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
