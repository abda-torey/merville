"use client";
import React from "react";
import Image from "next/image";

const Receipt = ({ order }) => {
  const orderData = {
    orderNumber: "12355278",
    orderDate: "2023-09-18",
    shipToName: "John Doe",
    shippingAddress: "123, Elm Street, Springfield",
    email: "abda@gmail.com",
    product: {
      imageUrl: "/path/to/image.jpg",
      name: "Product Name",
      color: "Red",
      size: "Medium",
      price: "$29.99",
    },
  };
  const printDiv = () => {
    window.print();
  };

  return (
    <div className="flex mt-24 items-center justify-center min-h-screen bg-gray-100 p-8 text-black">
      <div className="bg-gray-100 p-8">
        {/* First Row */}
        <div className="bg-gray-200 text-center py-6 rounded-md text-black">
          <h2 className="text-2xl font-bold">Thank you for your Order</h2>
          <p>Order number: {orderData.orderNumber}</p>
          <p>
            You will receive an email confirmation shortly at {orderData.email}
          </p>
        </div>

        {/* Second Row */}
        <div className="flex mt-8 gap-8">
          {/* Order details */}
          <div
            id="printablediv"
            className="p-6 bg-white max-w-xl mx-auto border rounded-lg shadow-lg"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <p className="mt-2">Order Number: 12355278</p>
              <p>Order Date: 2023-09-18</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold">Ship To:</h3>
              <p className="mt-2">John Doe</p>
              <p>Shipping Address: 123, Elm Street, Springfield</p>
            </div>
          </div>
          {/* Product details */}
          <div className="w-1/2 bg-white p-6 flex flex-col rounded-md">
            <div className="flex mb-6">
              <Image
                src={orderData.product.imageUrl}
                alt={orderData.product.name}
                width={100}
                height={100}
                className="mr-6"
              />
              <div>
                <h3 className="font-bold">{orderData.product.name}</h3>
                <p>
                  <strong>Selected Color:</strong> {orderData.product.color}
                </p>
                <p>
                  <strong>Selected Size:</strong> {orderData.product.size}
                </p>
                <p>
                  <strong>Price:</strong> {orderData.product.price}
                </p>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mb-4">
              <h4 className="font-bold">Shipping Method</h4>
              <p>Standard Fee</p>
              <p>Arrives in 2-3 days</p>
            </div>

            {/* Order Summary */}
            <div className="flex-1 mb-4">
              <h4 className="font-bold mb-2">Order Summary</h4>
              <div className="mb-1">
                <span>Merchandise:</span> <span>$50</span>
              </div>
              <div className="mb-1">
                <span>Shipping Fee:</span> <span>10.0</span>
              </div>
              <div className="mb-1">
                <span>Tax:</span> <span>12.0</span>
              </div>
              <div>
                <span>Order Total:</span> <span>300.21</span>
              </div>
            </div>

            <div className="flex justify-between">
              {/* Print Receipt Button */}
              <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={printDiv}
              >
                Print Receipt
              </button>

              {/* You can add more stuff to the right side if you wish */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
