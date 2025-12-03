import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";

const UpdateProductModal = ({ open, onClose, product }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const updateProduct = useProductStore((state) => state.updateProduct);
  const error = useProductStore((state) => state.error);

  // Populate input when product changes
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
    }
  }, [product]);

  // Show error
  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  if (!open) return null;

  const handleUpdate = async () => {
    const res = await updateProduct(product._id, { name, price });

    if (res.success) {
      setName("");
      setPrice("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      <div className="bg-white w-[90%] max-w-[400px] p-5 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-3 text-center">Update Product</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-3"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-3"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-600 cursor-pointer text-white w-full py-2 rounded mb-2"
        >
          Update
        </button>

        <button
          onClick={() => {
            setName("");
            setPrice("");
            onClose();
          }}
          className="bg-gray-300 cursor-pointer w-full py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateProductModal;
