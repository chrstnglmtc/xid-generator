import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="hero py-20">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-white">X Tools</h1>
          <p className="py-6">
            Welcome to X Tools, your ultimate hub for managing your X (Formerly
            Twitter) account effortlessly. Discover powerful tools for
            converting X IDs, checking account age, and more. Get ready to explore our tools:
          </p>
          <div className="space-x-1 space-y-3">
            <Link to="/generate" className="btn bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">X ID Generator</Link>
            <Link to="/checker" className="btn bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">X Age</Link>
            <div className="indicator">
            <span className="indicator-item badge badge-primary">new</span>
            <Link to="/doesfollow" className="btn bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">Friendship Checker</Link>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}
