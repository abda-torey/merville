import React from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
const Footer = () => {
  return (
    <footer className="bg-black text-white p-2">
      {/* Marquee */}

      <div className="w-full overflow-hidden ">
        <div className="flex overflow-hidden mb-4 text-sm font-medium  opacity-80 whitespace-nowrap animate-moveRightToLeft linear">
          <span className="mr-24">
            FREE ORDERS ABOVE 200 FREE FOR RED MEMBERS
          </span>
          <span className="mr-24">
            FREE ORDERS ABOVE 200 FREE FOR RED MEMBERS
          </span>

          {/* Duplicated texts */}
          <span className="mr-24">
            FREE ORDERS ABOVE 200 FREE FOR RED MEMBERS
          </span>
          <span className="mr-24">
            FREE ORDERS ABOVE 200 FREE FOR RED MEMBERS
          </span>
        </div>
      </div>

      {/* White Border Line */}
      <hr className="w-full mb-4 border-t border-white opacity-60" />

      {/* Columns */}
      <div className="flex flex-col md:flex-row gap-2  md:gap-8 justify-between">
        {/* First Column */}
        <div className=" ml-9">
          {/* <h3 className="font-extrabold tracking-widest text-lg ml-8 mb-4 opacity-60">
            Merville
          </h3> */}
          <img src="Merville.png" alt="Melville1 Logo" className=" w-20 h-auto" />

          <img src="logo8.png" alt="Melville1 Logo" className=" w-32 h-auto" />
        </div>

        {/* Second Column */}
        <div className=" mt-6">
          <h3 className="font-extrabold tracking-widest text-lg mb-4 opacity-60">
            MAY WE HELP YOU
          </h3>
          <ul className="space-y-2 font-medium text-xs tracking-wider opacity-60">
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline ">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Email Unsubscribe
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Payment Options
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Returns & Exchanges
              </a>
            </li>
          </ul>
        </div>

        {/* Third Column */}
        <div>
          <div className="mt-6">
            <h3 className="font-extrabold tracking-widest text-lg mb-4 opacity-60">
              THE COMPANY
            </h3>
            <ul className="space-y-2 font-medium text-xs tracking-wider opacity-60">
              <li>
                <a href="#" className="hover:underline">
                  About Merville
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline ">
                  Code of Ethics
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy & Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Fourth Column */}
        <div className="mt-6">
          <h3 className=" text-lg mb-4 font-extrabold tracking-widest opacity-60">
            Find Us On
          </h3>
          <div className="flex flex-col gap-1 font-medium text-xs tracking-wider opacity-60">
            {/* Replace these with actual icons */}
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M 5 3 C 3.897 3 3 3.897 3 5 L 3 19 C 3 20.103 3.897 21 5 21 L 11.621094 21 L 14.414062 21 L 19 21 C 20.103 21 21 20.103 21 19 L 21 5 C 21 3.897 20.103 3 19 3 L 5 3 z M 5 5 L 19 5 L 19.001953 19 L 14.414062 19 L 14.414062 15.035156 L 16.779297 15.035156 L 17.130859 12.310547 L 14.429688 12.310547 L 14.429688 10.574219 C 14.429687 9.7862188 14.649297 9.2539062 15.779297 9.2539062 L 17.207031 9.2539062 L 17.207031 6.8222656 C 16.512031 6.7512656 15.814234 6.71675 15.115234 6.71875 C 13.041234 6.71875 11.621094 7.9845938 11.621094 10.308594 L 11.621094 12.314453 L 9.2773438 12.314453 L 9.2773438 15.039062 L 11.621094 15.039062 L 11.621094 19 L 5 19 L 5 5 z"></path>
              </svg>
              <span>Facebook</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299 c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032 c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051 c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165 c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20 C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08 c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636 C20.514,6.135,21.699,4.943,22,3.999z M18,8.999c0,4.08-2.957,8.399-8.466,8.943C10.28,17.413,11,16.662,11,16.662 S8,14,7.775,10.522C8.81,10.838,9.888,10.999,11,10.999h2v-2.5c0-0.001,0-0.001,0-0.001C13.002,7.118,14.12,6,15.5,6 C16.881,6,18,7.119,18,8.5C18,8.5,18,8.92,18,8.999z"></path>
              </svg>
              <span>Twitter</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path>
              </svg>
              <span>Instagram</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M 12 4 C 12 4 5.7455469 3.9999687 4.1855469 4.4179688 C 3.3245469 4.6479688 2.6479687 5.3255469 2.4179688 6.1855469 C 1.9999687 7.7455469 2 12 2 12 C 2 12 1.9999687 16.254453 2.4179688 17.814453 C 2.6479687 18.675453 3.3255469 19.352031 4.1855469 19.582031 C 5.7455469 20.000031 12 20 12 20 C 12 20 18.254453 20.000031 19.814453 19.582031 C 20.674453 19.352031 21.352031 18.674453 21.582031 17.814453 C 22.000031 16.254453 22 12 22 12 C 22 12 22.000031 7.7455469 21.582031 6.1855469 C 21.352031 5.3255469 20.674453 4.6479688 19.814453 4.4179688 C 18.254453 3.9999687 12 4 12 4 z M 12 6 C 14.882 6 18.490875 6.1336094 19.296875 6.3496094 C 19.465875 6.3946094 19.604391 6.533125 19.650391 6.703125 C 19.891391 7.601125 20 10.342 20 12 C 20 13.658 19.891391 16.397875 19.650391 17.296875 C 19.605391 17.465875 19.466875 17.604391 19.296875 17.650391 C 18.491875 17.866391 14.882 18 12 18 C 9.119 18 5.510125 17.866391 4.703125 17.650391 C 4.534125 17.605391 4.3956094 17.466875 4.3496094 17.296875 C 4.1086094 16.398875 4 13.658 4 12 C 4 10.342 4.1086094 7.6011719 4.3496094 6.7011719 C 4.3946094 6.5331719 4.533125 6.3946094 4.703125 6.3496094 C 5.508125 6.1336094 9.118 6 12 6 z M 10 8.5351562 L 10 15.464844 L 16 12 L 10 8.5351562 z"></path>
              </svg>
              <span>Youtube</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M 12 2 C 6.477 2 2 6.477 2 12 C 2 17.523 6.477 22 12 22 C 17.523 22 22 17.523 22 12 C 22 6.477 17.523 2 12 2 z M 12 4 C 16.418 4 20 7.582 20 12 C 20 16.418 16.418 20 12 20 C 11.264382 20 10.555494 19.892969 9.8789062 19.707031 C 10.09172 19.278284 10.282622 18.826454 10.386719 18.425781 C 10.501719 17.985781 10.972656 16.191406 10.972656 16.191406 C 11.278656 16.775406 12.173 17.271484 13.125 17.271484 C 15.958 17.271484 18 14.665734 18 11.427734 C 18 8.3227344 15.467031 6 12.207031 6 C 8.1520313 6 6 8.7215469 6 11.685547 C 6 13.063547 6.73325 14.779172 7.90625 15.326172 C 8.08425 15.409172 8.1797031 15.373172 8.2207031 15.201172 C 8.2527031 15.070172 8.4114219 14.431766 8.4824219 14.134766 C 8.5054219 14.040766 8.4949687 13.958234 8.4179688 13.865234 C 8.0299688 13.394234 7.71875 12.529656 7.71875 11.722656 C 7.71875 9.6496562 9.2879375 7.6445312 11.960938 7.6445312 C 14.268937 7.6445313 15.884766 9.2177969 15.884766 11.466797 C 15.884766 14.007797 14.601641 15.767578 12.931641 15.767578 C 12.009641 15.767578 11.317063 15.006312 11.539062 14.070312 C 11.804063 12.953313 12.318359 11.747406 12.318359 10.941406 C 12.318359 10.220406 11.932859 9.6191406 11.130859 9.6191406 C 10.187859 9.6191406 9.4296875 10.593391 9.4296875 11.900391 C 9.4296875 12.732391 9.7109375 13.294922 9.7109375 13.294922 C 9.7109375 13.294922 8.780375 17.231844 8.609375 17.964844 C 8.5246263 18.326587 8.4963381 18.755144 8.4941406 19.183594 C 5.8357722 17.883113 4 15.15864 4 12 C 4 7.582 7.582 4 12 4 z"></path>
              </svg>
              <span>Pinterest</span>
            </div>
          </div>
        </div>

        {/* Fifth Column - Newsletter Signup */}
        <div className="mt-6 w-96">
          <h3 className="font-extrabold text-lg mb-4 tracking-widest opacity-60 ">
            SIGN UP MERVILLE UPDATES
          </h3>
          <p className="mb-4 font-medium text-xs tracking-wider opacity-60">
            By entering your email address below, you consent to recieving our
            newsletter with access to our latest collections, events and
            Initiatives. More details on this are provided in our privacy
            policy.
          </p>

          <div className="flex mt-6">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-grow bg-black focus:border-none border-b border-white  mr-2 rounded-none"
            />
            <button className="bg-white text-black text-sm font-medium opacity-80  hover:bg-gray-200 px-2 py-2 rounded-none ">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="relative mt-10 opacity-60">
        <div className="absolute bottom-0 left-0 text-xs font-semibold">
          &copy; 2023 Merville London. All rights reserved
        </div>
        <div className="absolute bottom-0 right-0">
          <button className="rounded border border-gray-400 p-1">
            <ChevronUpIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
