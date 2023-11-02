"use client";
import React, { useEffect, useState } from "react";
import { format, utcToZonedTime } from "date-fns-tz";
import Image from "next/image";

const formatDateToET = (dateStr) => {
  const easternTime = utcToZonedTime(dateStr, "America/New_York");
  return format(easternTime, "M/d/yyyy h:mm:ss aaaa 'ET'", {
    timeZone: "America/New_York",
  });
};

const Receipt = () => {
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const storedOrderId = localStorage.getItem("orderId");
    const id = storedOrderId.replace(/"/g, ""); // Strip quotation marks
    console.log(id);
    const getOrder = async (id) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setOrderData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      getOrder(id);
    }
  }, []);
  const createdAtValue = orderData && orderData.createdAt;
  const orderId = orderData && orderData.orderId;
  console.log(createdAtValue);

  return (
    <div className=" mt-24  mb-8 flex flex-col items-center justify-center text-black">
      <div className="bg-gray-200 w-[60%] p-4">
        <div className=" bg-gray-200">
          <h1 className="text-2xl  mb-4 font-FuturaHeavy">
            Thank you for your order
          </h1>
          <p className="mb-4 font-FuturaMedium">Order number: {orderId}</p>
          <p className="mb-8 font-FuturaLight">
            You will receive an email confirmation shortly at
            john.newman.baymard@gmail.com.
          </p>
        </div>
      </div>
      <div className=" w-[60%] mt-2 mb-2">
        <div className="flex">
          <div className="w-72 bg-gray-100 p-4 ">
            <h2 className="text-xl font-FuturaBold mb-4">
              Detailed Order Receipt
            </h2>
            <p className="mb-4 font-FuturaLight text-sm">
              Order Date: {createdAtValue && formatDateToET(createdAtValue)}
            </p>
            <p className="mb-4 font-FuturaLight text-xs">Order Number: {orderId}</p>
            
            <p className="mb-4 font-FuturaLight">Ship to John Newman</p>

            <h3 className="text-lg font-FuturaBold mb-4">Shipping Address</h3>
            <p className="mb-2 font-FuturaLight text-sm">John Newman</p>
            <p className="mb-2 font-FuturaLight text-sm">CHESTNUT ST</p>
            <p className="mb-2 font-FuturaLight text-sm">
              SACRAMENTO, CA,94203
            </p>
            <p className="mb-8 font-FuturaLight text-sm">+4407729966565</p>
          </div>
          <div className="w-96 pl-10  flex flex-col">
            <div className=" flex items-center justify-center">
              <div className="flex-grow overflow-y-auto h-36 ">
                {orderData?.products?.map((product, productIdx) => (
                  <div className="flex mt-7  " key={productIdx}>
                    {/* Product Image */}
                    <div className=" w-[130px] h-[130px] p-4 bg-gray-100 flex items-center justify-center">
                      <Image
                        src={product.image}
                        width={500}
                        height={500}
                        alt={product.name}
                        className=" w-24"
                      />
                    </div>

                    {/* Product Details */}
                    <div className=" pl-4 w-[145px] flex flex-col">
                      <div>
                        <h2 className=" font-FuturaLight tracking-wide font-bold text-xs mb-2">
                          {product.name}
                        </h2>
                        <p className=" font-FuturaLight text-gray-600  text-xs">
                          Color: {product.color}
                        </p>
                        <p className="font-FuturaLight text-gray-600  mb-0  text-xs">
                          Size: {product.size}
                        </p>
                        <p className="font-FuturaLight text-gray-600  mb-0  text-xs">
                          Qty: {product.quantity}
                        </p>
                        <span className="font-FuturaLight text-gray-600  mb-3  text-xs">
                          £{product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" flex">
              <div>
                <div className=" mt-4">
                  <h3 className=" font-FuturaBold  text-sm">Shipping Method</h3>
                  <p className="pl-1 mt-1 font-FuturaLight text-xs">
                    standard fee
                  </p>
                  <span className="pl-1 font-FuturaLight text-xs">
                    arrives 2-5 days
                  </span>
                </div>

                <div className=" mt-24">
                  <button className=" border bg-black text-white p-2 w-20 text-xs">
                    Print Receipt
                  </button>
                </div>
              </div>
              <div className=" flex place-items-end ml-32">
                <div>
                  <h3 className=" font-FuturaBold tracking-widest">
                    Order Summary
                  </h3>
                  <p className=" font-FuturaLight text-sm">
                    Merchandize $50.00
                  </p>
                  <p className=" font-FuturaLight text-sm">Shipping $8.99</p>
                  <p className=" font-FuturaLight text-sm">Tax $0.00</p>
                  <h3 className=" font-FuturaBold text-sm">
                    Order Total: $50.00
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
