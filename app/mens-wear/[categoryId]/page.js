import React from 'react'
import Link from 'next/link';
const getProducts = async (categoryId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/category/${categoryId}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const page = async ({params}) => {
    const products = await getProducts(params.categoryId)
  return (
    <div className="bg-white min-h-screen p-4 mt-28">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
        {products.map(product => (
          <div key={product.id} className="bg-gray-400 text-black p-4 flex flex-col items-center">

            <img src={product.imageDetails[0].imageUrl} alt={product.name} className="w-1/2" />
            <Link href={`/product/${product.id}`}>
            <h2 className="text-center mt-2">{product.name}</h2>
            <p className="text-center mt-1">£{product.price.toFixed(2)}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
