import Product from "../models/product.model.js";

// create product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (!product) {
      return res.status(404).json({ message: "create failed" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all product
export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get one
export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "data not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productUpdate = await Product.findByIdAndUpdate(id, req.body);
    if (!productUpdate) {
      return res.status(404).json({ message: "data not found" });
    }
    const update = await Product.findById(id);
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete by id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "data not found" });
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
