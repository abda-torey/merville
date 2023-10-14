import React, { useState } from "react";

const MenuBar = ({ setMenuOpen, menuOpen }) => {
  //   const [showSubcategories, setShowSubcategories] = useState(false);
  //   const toggleSubcategories = () => setShowSubcategories(!showSubcategories);

  return (
    <>
      <div className="top-0 left-0 w-72 bg-white  p-10 pr-20 text-black fixed h-full z-40 ease-in-out duration-1000 ">
        <div className="flex justify-start p-4">
          <button className="text-2xl" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        </div>
        {/* Separator */}
        <hr className="border-gray-300 mb-4" />
        <h3 className="mt-20 text-4xl font-semibold ">
          I am a sidebar
        </h3>
      </div>
    </>
  );
};

export default MenuBar;
