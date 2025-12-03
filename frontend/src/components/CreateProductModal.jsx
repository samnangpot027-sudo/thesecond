import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";

const CreateProductModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const error = useProductStore((state) => state.error);
  const createProduct = useProductStore((state) => state.createProduct);

  // Show error alert
  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  if (!open) return null;

  const handleSave = async () => {
    const res = await createProduct({ name, price });

    if (res.success) {
      setName("");
      setPrice("");
      onClose(); // close modal
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40">
      <div className="bg-white w-[90%] max-w-[400px] p-5 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-3 text-center">Add New Product</h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded"
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-500"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 cursor-pointer py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
