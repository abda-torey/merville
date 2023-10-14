"use client";
import React, { useState, useEffect } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import classNames from "classnames";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const Header = () => {
  // State to hold current and last scroll positions
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const toggleSubcategories = () => setShowSubcategories(!showSubcategories);
  const { isSignedIn, user } = useUser();
  const SCROLL_THRESHOLD = 20;
  useEffect(() => {
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
  }, [lastScrollTop]);
  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  if (isOpen) {
    // Prevent scrolling when the menu is open
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <header
      className={classNames(
        isHeaderVisible ? "block" : "hidden", // This line toggles header visibility
        "fixed left-0 w-full h-[50px] flex items-center z-10 bg-black transition-all duration-[.4s] ease-in-out group",
        "md:h-[70px]"
      )}
    >
      {/* header inner */}
      <div
        className={classNames(
          "flex top-2 flex-1 items-center justify-between px-[36px] ",
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
              onClick={toggleDrawer}
            >
              Menu
            </span>
          </button>
          <div
            className={`fixed inset-0 z-20 bg-black opacity-50 ${
              isOpen ? "block" : "hidden"
            }`}
            onClick={toggleDrawer}
          ></div>
          <aside
            className={`transform top-0 left-0 w-64 bg-white text-black fixed h-full overflow-auto z-30 transition-transform duration-1000 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Close Button */}
            <div className="flex justify-start p-4">
              <button className="text-2xl" onClick={() => toggleDrawer()}>
                ✕
              </button>
            </div>

            {/* Separator */}
            <hr className="border-gray-300 mb-4" />

            {/* Menu Items */}
            <ul className="space-y-4 pl-6">
              <li className="text-xl">Home</li>
              <li
                className="text-xl flex justify-between items-center"
                onClick={toggleSubcategories}
              >
                Categories
                {/* Dropdown Indicator */}
                <span className="mr-4">{showSubcategories ? "▲" : "▼"}</span>
              </li>
              {showSubcategories && (
                <ul className="space-y-2 pl-6">
                  {/* Subcategories */}
                  <li>Subcategory 1</li>
                  <li>Subcategory 2</li>
                  <li>Subcategory 3</li>
                </ul>
              )}
            </ul>
          </aside>
          {/* search */}
          <button type="button" className="flex items-center gap-2">
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
        </div>
        {/* header center */}
        <div
          className={classNames(
            "absolute max-w-[77px] w-full left-1/2 top-[40px] -translate-x-1/2 -translate-y-1/2",
            "md:max-w-[150px]"
          )}
        >
          <Link href="/">
            <span className="font-bold tracking-widest text-2xl md:pl-4">
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
              <Link href="/sign-in">
                <button className="flex items-center gap-2">
                  <span className="hidden  text-sm tracking-wide md:inline">
                    Sign in
                  </span>
                  <UserCircleIcon className="h-4 w-4" />
                </button>
              </Link>
            )}
            <UserButton afterSignOutUrl="/" />
            <button className="flex items-center">
              <Link href="/cart" className="flex items-center gap-2">
                <span className="hidden text-sm tracking-wide   md:inline">
                  Bag
                </span>
                <ShoppingBagIcon className="h-4 w-4" />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
