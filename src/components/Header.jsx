import React from "react";

export default function Header() {
  return (
    <header className="navbar bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <h1 className="navbar-start text-2xl font-bold">X Tools</h1>
      <div className="navbar-end flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>XID</a>
          </li>
          <li>
            <a>Shadowban</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
