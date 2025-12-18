import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import CreateProductModal from "./CreateProductModal";
import UpdateProductModal from "./UpdatProductModal";

const Card = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { fetchProduct, product, deleteProduct } = useProductStore();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div className="w-full max-w-[70%] mx-auto">
      {/* Add New */}
      <div className="flex justify-end mb-5">
        <button
          onClick={() => setOpenCreate(true)}
          className="bg-blue-600 cursor-pointer text-white px-3 py-1 rounded"
        >
          Add New
        </button>
      </div>

      {/* Products */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {product.map((item) => (
          <div key={item._id} className="bg-gray-200 p-4 rounded shadow">
            <p className="font-bold">{item.name}</p>
            <p>Price: {item.price} ៛</p>

            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => {
                  setSelectedProduct(item);
                  setOpenUpdate(true);
                }}
                className="bg-blue-600 cursor-pointer text-white px-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={async () => {
                  await deleteProduct(item._id);
                  fetchProduct(); // refresh list
                }}
                className="bg-red-600 cursor-pointer text-white px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <CreateProductModal
        open={openCreate}
        onClose={() => {
          setOpenCreate(false);
          fetchProduct();
        }}
      />

      {/* Update Modal */}
      <UpdateProductModal
        open={openUpdate}
        onClose={() => {
          setOpenUpdate(false);
          setSelectedProduct(null);
          fetchProduct();
        }}
        product={selectedProduct}
      />
    </div>
  );
};

export default Card;
