/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { fetchTwitterProfile } from "./functions/fetchTwitterProfile";

export default function GenerateForm() {
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
      const results = await Promise.all(usernames.map(fetchTwitterProfile));
      setResults(results);
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
    <div className="container mx-auto py-8 flex-grow p-4">
      <form className="flex flex-col items-center py-6 space-y-3">
        <textarea
          rows="3"
          placeholder="Enter X username or usernames split by commas or new line without @"
          className="p-4 text-white-100 rounded-xl resize-none w-full sm:w-2/3 lg:w-1/2"
          value={usernamesInput}
          onChange={handleInputChange}
        />
        <button
          className="w-full sm:w-2/3 lg:w-1/2 py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
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
            "Convert"
          )}
        </button>
        <div className="w-full sm:w-2/3 lg:w-1/2 h-80 overflow-y-auto bg-zinc-800 rounded-xl p-4">
          {results.map((result, index) => (
            <div key={index} className="text-left">
              {result.success ? (
                <>
                  <p>@{result.data.username}</p>
                  <p>{result.data.userId}</p>
                  <p>{result.data.profileName}</p>
                  <p>{result.data.profileBio}</p>
                  <p>{result.data.profileLocation}</p>
                  <p>{result.data.profileWebsite}</p>
                  <p>https://x.com/intent/user?user_id={result.data.userId}</p>
                </>
              ) : (
                <p>{result.message}</p>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
