import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header({ children }) {
  return (
    <div className="drawer flex">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col w-full">
        {/* Navbar */}
        <div className="navbar bg-gradient-to-r from-purple-500 to-indigo-600 text-white w-full flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center w-full">
            <div className="flex-0 lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-8 w-8 mr-2"
                aria-label="logo"
              >
                <path
                  fill="#ffffff"
                  d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                />
              </svg>
              <h1 className="text-2xl">X Tools</h1>
            </div>
          </div>
          {/* Right section */}
          <div className="hidden lg:flex space-x-4 items-center">
            <Link to="/" className="btn btn-ghost">Home</Link>
            <Link to="/generate" className="btn btn-ghost">X ID Generator</Link>
            <Link to="/checker" className="btn btn-ghost">X Age</Link>
          </div>
        </div>
        {/* Page content here */}
        <div className="flex-1">
          {children}
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-zinc-900 min-h-full w-80 p-4 text-xl">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/generate">X ID Generator</Link>
          </li>
          <li>
            <Link to="/checker">X Age</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node
};
