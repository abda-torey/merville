"use client";
import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const ProfileDropDown = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <Menu as="div" className="relative ml-3 font-FuturaMedium">
      <div>
        <Menu.Button className="relative flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <svg
            fill="white"
            stroke="white"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            ></path>
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                My orders
              </a>
            )}
          </Menu.Item>
         
          <Menu.Item>
            {({ active }) => (
              <div
                href="#"
                className={classNames(
                  active ? "bg-gray-100 cursor-pointer" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
                onClick={() => signOut(() => router.push("/"))}
              >
                Sign out
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropDown;
