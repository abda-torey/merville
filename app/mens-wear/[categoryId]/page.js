import React from "react";
import Link from "next/link";
import Image from "next/image";

const getProducts = async (categoryId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${categoryId}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
const page = async ({ params }) => {
  const products = await getProducts(params.categoryId);
  return (
    <div className="bg-white mt-16 mb-16">
      {" "}
      {/* added mb-16 for spacing before footer */}
      <div className="relative w-full h-64 mb-8">
        <Image
          src="/shoesCategory.png"
          width={100}
          height={100}
          alt="shoes wear image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-medium text-3xl tracking-wider px-3 py-1">
            SHOES
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1 mb-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-200 text-black p-4  flex flex-col items-center"
          >
            <img
              src={product.imageDetails[0].imageUrl}
              alt={product.name}
              className="w-1/2 mt-10"
            />
            <Link href={`/product/${product.id}`}>
              <h2 className="text-center text-xs mt-10  tracking-tighter font-body font-medium">{product.name}</h2>
              <p className="text-center text-xs font-medium font-body tracking-tighter mt-1 md:mb-10">£{product.price.toFixed(2)}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
