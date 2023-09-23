import React from "react";
import Link from "next/link";
const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const page = async () => {
  const categories = await getCategories()
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center mt-28 space-y-8">
        <h1 className="text-center text-4xl font-bold text-black mb-12">
          Mens Wear
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-8 max-w-6xl">
          {categories.map((category, idx) => (
            <div
              key={category.id}
              className={`relative rounded overflow-hidden ${
                idx === 0 ? "col-span-1 md:col-span-2" : ""
              }`}
            >
              <img
                src={category.imageDetails[0].imageUrl}
                alt={category.name}
                className="w-full object-cover"  // Removed the "h-full" to adjust the image size
                style={{ maxHeight: '70%' }}    // Set the maximum height to 80%
              />

              <div className="mt-4 text-center">  {/* Added a margin-top for spacing */}
                <h2 className="text-black text-2xl mb-3">{category.name}</h2>
                <Link href={`/mens-wear/${category.id}`} className="text-black underline">
                  Discover More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
