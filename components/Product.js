"use client";
import React,{useState} from "react";

const Product = ({ product }) => {
  const [selectedSize, setSize] = useState(null);
  const [selectedColor, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const proceedToCheckout = () => {
    console.log("Selected Product Details:", {
      productId: product.id,
      selectedSize,
      selectedColor,
      quantity,
    });
  };
  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col md:flex-row mt-28 text-black">
        {/* Image */}
      <div className="md:w-1/2 p-2 flex justify-center items-center mt-10">
        <img
          src={product.imageDetails[0].imageUrl}
          alt={product.name}
          className=" w-96 h-auto shadow-lg rounded-lg"
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-between p-6 bg-white shadow-lg rounded-lg">
        <div>
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-xl font-semibold mb-6">
            £{product.price.toFixed(2)}
          </p>

          {/* Size Selector */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="size">
              Size
            </label>
            <select
              id="size"
              onChange={(e) => setSize(e.target.value)}
              className="form-select block w-full rounded-md"
            >
              <option value="">Select size</option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Color Selector */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="color">
              Color
            </label>
            <select
              id="color"
              onChange={(e) => setColor(e.target.value)}
              className="form-select block w-full rounded-md"
            >
              <option value="">Select color</option>
              {product.colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Selector */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-input block w-full rounded-md"
            />
          </div>
        </div>

        {/* Proceed to Checkout Button */}
        <button
          onClick={() => proceedToCheckout()}
          className="mt-6 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Proceed to Checkout
        </button>
      </div>

      
    </div>
  );
};

export default Product;
