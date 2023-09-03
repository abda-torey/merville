"use client";
import React from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import classNames from "classnames";

const Header = () => {
  return (
    <header
      className={classNames(
        "fixed  left-0 w-full h-[56px] flex items-center z-10 bg-black  hover:bg-white transition-all duration-[.4s] ease-in-out group",
        "md:h-[88px]"
      )}
    >
        {/* header inner */}
      <div className={classNames(
        "flex top-2 flex-1 items-center justify-between px-[36px] group-hover:text-black",
        "md:px-[36px]"
      )}>
        {/* header left */}
        <div className={classNames(
            "flex items-center gap-[16px]",
            "gap-[30px]"
        )}>
          {/* menu */}
          <button type="button" className="flex items-center gap-2">
            <Bars3Icon className="h-6 w-6" />
            <span className={classNames(
                "hidden","md:inline-block"
            )}>Menu</span>
          </button>
          {/* search */}
          <button type="button" className="flex items-center gap-2">
            <MagnifyingGlassIcon className="h-6 w-6" />
            <span className={classNames(
                "hidden","md:inline-block"
            )}>Search</span>
          </button>
        </div>
        {/* header center */}
        <div
          className={classNames(
            "absolute max-w-[77px] w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "md:max-w-[150px]"
          )}
        >
          <Link href="/">
          <span className=" font-body-Futura font-bold tracking-widest text-xl md:pl-4">
            Merville
          </span>
          </Link>
        </div>
        {/* menu right */}
        <div className="flex items-center gap-[10px]">
          <div className={classNames(
            "flex items-center gap-[20px] md:gap-[50px]",
            "md:flex"
            
          )}>
            <button className="flex items-center gap-2">
                <span className="hidden md:inline">Sign In</span>
                <UserCircleIcon className="h-6 w-6" />
            </button>
            <button className="flex items-center gap-1">
            <span className="hidden md:inline">Bag</span>
            <ShoppingBagIcon className="h-6 w-6" />
            </button>
          </div>
           
        </div>
      </div>
    </header>
  );
};

export default Header;
