/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { accountAge } from "./functions/accountAge";

export default function CheckerForm() {
  const [usernamesInput, setUsernamesInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    let inputValue = event.target.value;

    // Remove '@' symbol from the beginning of the username
    if (inputValue.startsWith("@")) {
      inputValue = inputValue.substring(1);
    }

    setUsernamesInput(inputValue);
  };

  const handleClick = async () => {
    setLoading(true);
    setResults([]);

    const usernames = usernamesInput
      .split(/[,\n]/)
      .map((username) => username.trim())
      .filter((username) => username !== ""); // Remove empty strings

    try {
      const userIds = await accountAge(usernames);
      setResults(userIds);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="container mx-auto py-8 flex-grow items-center p-4">
      <h1 className="font-bold text-2xl text-slate-50">X Age Checker</h1>
      <div className="join items-center py-6">
        <div>
          <div>
            <input
              className="input input-bordered join-item bg-zinc-900 text-white focus:text-white focus:bg-zinc-900"
              placeholder="X Username"
              value={usernamesInput}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <button
            className="btn join-item bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>
      <div className="bg-zinc-800 rounded-xl p-4">
        {results.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
    </div>
  );
}
