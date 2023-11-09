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
    <div className=" mt-24  mb-8 flex flex-col items-center justify-center text-black mx-2 md:mx-0">
      <div className=" bg-customColor w-full md:w-[50%] p-4">
        <div className=" bg-customColor">
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
      <div className=" w-full md:w-[50%] mt-2 mb-2">
        <div className="flex ">
          <div className=" w-full  md:w-[50%] bg-gray-100 p-4 ">
            <h2 className="text-xl font-FuturaLight mb-4">
              Detailed Order Receipt
            </h2>
            <p className="mb-4 font-FuturaLight text-xs">Order Number: {orderId}</p>
            <p className="mb-4 font-FuturaLight text-xs">
              Order Date: {createdAtValue && formatDateToET(createdAtValue)}
            </p>
           
            
            <p className="mb-4 font-FuturaLight tracking-widest">Ship to John Newman</p>

            <h3 className="text-lg font-FuturaMedium tracking-widest mb-4">Shipping Address</h3>
            
            <span className="mb-2 font-FuturaLight text-sm tracking-widest">John Newman</span><br></br>
            <span className="mb-2 font-FuturaLight text-sm tracking-widest">CHESTNUT ST</span><br></br>
            <span className="mb-2 font-FuturaLight text-sm tracking-widest">
              SACRAMENTO, CA,94203
            </span>
            <p className="mb-8 font-FuturaLight text-sm">+4407729966565</p>
          </div>
          
          <div className="w-full md:w-[60%] pl-10   hidden md:flex flex-col">
            <div className=" flex  ">
              
              <div className="flex-grow overflow-y-auto  p-0 items-start justify-start  h-[140px]  ">
                {orderData?.products?.map((product, productIdx) => (
                  <div className="flex mt-7  " key={productIdx}>
                    {/* Product Image */}
                    <div className=" w-[130px] h-[110px] p-4 bg-gray-100 flex items-center justify-center">
                      <Image
                        src={product.image}
                        width={500}
                        height={500}
                        alt={product.name}
                        className=" w-20"
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
            <div className=" hidden md:flex ">
              <div>
                <div className=" mt-4 w-36 ">
                  <h3 className=" font-FuturaMedium tracking-widest  text-sm">Shipping Method</h3>
                  <p className="pl-1 mt-1 font-FuturaLight tracking-widest text-xs">
                    standard fee
                  </p>
                  <span className="pl-1 font-FuturaLight text-xs">
                    arrives 2-5 days
                  </span>
                </div>

                <div className=" mt-24">
                  <button className=" border bg-black text-white tracking-widest font-FuturaLight p-2 w-24 text-xs">
                    Print Receipt
                  </button>
                </div>
              </div>
              <div className=" flex place-items-end ml-12 w-96">
                <div className=" ">
                  <h3 className=" font-FuturaMedium text-sm tracking-widest">
                    Order Summary
                  </h3>
                  <p className=" font-FuturaLight text-[13px] tracking-widest">
                    Merchandize $50.00
                  </p>
                  <p className=" font-FuturaLight text-[13px] tracking-widest">Shipping $8.99</p>
                  <p className=" font-FuturaLight text-[13px] tracking-widest">Tax $0.00</p>
                  <h3 className=" font-FuturaMedium text-[13px] tracking-widest">
                    Order Total: $50.00
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className=" block md:hidden font-FuturaMedium tracking-widest bg-black text-white border p-4 w-44 mt-4">Print Receipt</button>
    </div>
  );
};

export default Receipt;
