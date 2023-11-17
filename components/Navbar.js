"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import localFont from "next/font/local";
import CartContext from "@/app/context/CartContext";
import Cart from "./Cart/Cart";
import CartSideBar from "./Cart/CartSideBar";
import ProfileDropDown from "./menu/ProfileDropDown";

const futuraMedium = localFont({
  src: "../public/fonts/futura medium bt.ttf",
  variable: "--font-futura-medium",
});

// funcion to clear search input after a while

const Header = ({ categories }) => {
  // State to hold current and last scroll positions
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search overlay
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { toggleDrawerBag, isBagOpen, cart } = useContext(CartContext);
  const cartItemCount = cart && cart.cartItems ? cart.cartItems.length : 0;
  const toggleSubcategories = () => setShowSubcategories(!showSubcategories);
  const { isSignedIn, user } = useUser();
  const SCROLL_THRESHOLD = 20;

  useEffect(() => {
    // Ensure document and window objects are defined
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }
    if (isOpen || isBagOpen || isSearchOpen) {
      // Prevent scrolling when either drawer is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Function to handle scroll events
    const handleScroll = () => {
      let st = window.scrollY || document.documentElement.scrollTop;
      // Check if the difference surpasses the threshold
      if (st > lastScrollTop + SCROLL_THRESHOLD) {
        // Scrolling down past threshold
        setIsHeaderVisible(false);
      } else if (st < lastScrollTop) {
        // Scrolling up past threshold
        setIsHeaderVisible(true);
      }
      // Update last scroll position
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    // Attach the scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, isOpen, isBagOpen, isSearchOpen]);
  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
    setShowSubcategories(false);
  };
  // toggle search bar
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  //  function to search db as user types
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };
  // const debouncedSearch = debounce(async (q) => {
  //   try {
  //     const res = await fetch(`/api/search?q=${q}`);
  //     const data = await res.json();
  //     setResults(data);
  //   } catch (error) {
  //     console.error("Search error:", error);
  //   }
  // }, 300); // wait 300ms after the last keypress

  return (
    <header
      className={classNames(
        isHeaderVisible ? "block" : "hidden", // This line toggles header visibility
        "fixed left-0 w-full h-[50px] flex items-center z-20 bg-black transition-all duration-[.4s] ease-in-out group",
        "md:h-[60px]"
      )}
    >
      {/* header inner */}
      <div
        className={classNames(
          "flex top-2 flex-1 items-center justify-between px-[13px] md:px-[36px] ",
          "md:px-[36px]"
        )}
      >
        {/* header left */}
        <div
          className={classNames("flex items-center gap-[16px]", "gap-[30px]")}
        >
          {/* menu */}
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => toggleDrawer()}
          >
            <Bars3Icon className="h-4 w-4" />
            <span
              className={classNames(
                "hidden",
                "text-sm tracking-wide",
                "md:inline-block"
              )}
            >
              Menu
            </span>
          </button>
          <div
            className={`fixed inset-0 z-30 bg-black opacity-50 ${
              isOpen ? "block" : "hidden"
            }`}
            onClick={toggleDrawer}
          ></div>
          <aside
            className={`transform top-0 left-0 w-52 md:w-64 bg-white  text-black fixed h-full overflow-auto z-40 transition-transform duration-1000 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Close Button */}
            <div className="flex justify-start p-[18px] ml-4 ">
              <button className="text-2xl" onClick={() => toggleDrawer()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Separator */}
            <hr className="border-gray-300 mb-4 mt-4 w-56" />

            {/* Menu Items */}
            <ul className="space-y-4 pl-6">
              <li
                className={`${futuraMedium.className} text-sm cursor-pointer`}
              >
                <Link href="/" onClick={toggleDrawer}>
                  Home
                </Link>
              </li>
              <li
                className={`${futuraMedium.className} text-sm flex justify-between items-center`}
              >
                <Link
                  href="/mens-wear"
                  className=" cursor-pointer "
                  onClick={toggleDrawer}
                >
                  Menswear
                </Link>
                {/* Dropdown Indicator */}
                <div
                  className="bg-white border border-black rounded-sm p-1 flex items-center justify-center mr-8 cursor-pointer"
                  onClick={toggleSubcategories}
                >
                  {showSubcategories ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  )}
                </div>
              </li>
              {showSubcategories && (
                <ul className="space-y-2 pl-6">
                  {/* Subcategories */}
                  {categories.map((category) => (
                    <Link href={`/mens-wear/${category.id}`} key={category.id}>
                      <li
                        className={`${futuraMedium.className} text-xs text-gray-500 tracking-wide cursor-pointer
                      hover:text-gray-600 hover:text-sm
                      `}
                        onClick={toggleDrawer}
                      >
                        {category.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </ul>
            {/* Separator */}
            <hr className="border-gray-300 mb-4 mt-4 w-56" />
          </aside>
          {/* search */}
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={toggleSearch}
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
            <span
              className={classNames(
                "hidden",
                "text-sm tracking-wide",
                "md:inline-block"
              )}
            >
              Search
            </span>
          </button>

          {/* Search overlay */}
          {isSearchOpen && (
            <div className="fixed inset-0 z-10 bg-black bg-opacity-100 flex justify-center items-start">
              {/* Close icon */}
              <div
                className="absolute top-[20px] left-[60px] md:top-[22px]  md:left-[114px] cursor-pointer"
                onClick={toggleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              {/* Search input */}
              <div className="w-full md:w-1/2 p-6">
                <input
                  type="text"
                  value={query}
                  onChange={handleChange}
                  className="w-full mt-20 p-2 border-0 border-b border-gray-300 bg-transparent focus:outline-none focus:ring-0"
                  placeholder="Search..."
                  // Add any input logic or handlers here
                />
              </div>
            </div>
          )}
        </div>
        {/* header center */}
        <div
          className={classNames(
            "absolute max-w-[77px] w-full left-1/2 top-[25px] md:top-[30px] -translate-x-1/2 -translate-y-1/2",
            "md:max-w-[150px]"
          )}
        >
          <Link href="/">
            <span className="font-bold tracking-widest text-xl md:text-2xl md:pl-4">
              Merville
            </span>
          </Link>
        </div>
        {/* menu right */}
        <div className="flex items-center gap-[10px]">
          <div
            className={classNames(
              "flex items-center gap-[20px] md:gap-[20px]",
              "md:flex"
            )}
          >
            {!isSignedIn && (
              <Link href="/auth">
                <button className="flex items-center gap-2">
                  <span className="hidden  text-sm tracking-wide md:inline">
                    Sign in
                  </span>
                  <UserCircleIcon className="h-4 w-4" />
                </button>
              </Link>
            )}
            {isSignedIn && (
              // <UserButton afterSignOutUrl="/" />
              <ProfileDropDown />
            )}

            <button
              className="flex items-center gap-1 relative"
              onClick={toggleDrawerBag}
              disabled = {!cart?.cartItems || cart?.cartItems.length === 0}
            >
              <span className="hidden text-sm tracking-wide md:inline">
                Bag
              </span>
              <ShoppingBagIcon className="h-3 w-3" />
              {cartItemCount > 0 && (
                <span className="absolute -top-[13px] md:-top-[10px] -right-2   text-white rounded-full px-1 py-1 text-[9px]">
                  {cartItemCount}
                </span>
              )}
            </button>
            <div
              className={`fixed inset-0 z-30 bg-black opacity-50 ${
                isBagOpen ? "block" : "hidden"
              }`}
              onClick={toggleDrawerBag}
            ></div>
            <aside
              className={`hidden md:block transform top-0 right-0 w-64 md:w-[330px] bg-white  text-black fixed h-full overflow-auto z-40 transition-transform duration-1000 ease-in-out ${
                isBagOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <CartSideBar toggleDrawerBag={toggleDrawerBag} />
            </aside>
            <aside
              className={`md:hidden block transform bottom-0 right-0 w-full md:w-[360px] bg-white text-black fixed h-[600px] overflow-auto z-40 transition-transform duration-1000 ease-in-out ${
                isBagOpen ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <CartSideBar toggleDrawerBag={toggleDrawerBag} />
            </aside>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
