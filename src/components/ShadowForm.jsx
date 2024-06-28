import React, { useState } from "react";
import { shadowCheck } from "./functions/shadowCheck";

export default function ShadowForm() {
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
      const userResults = await shadowCheck(usernames);
      setResults(userResults.flat()); // Flatten the array of arrays
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

  const getStatusBadge = (result) => {
    if (result.status === 'failure') {
      return (
        <div className="text-center text-white">
          <span>@{result.username}</span>
          <br />
          <div className="divider divider-primary">Search Results</div>
          <div className="badge badge-danger">Error</div>
          <br/>
          <div className="badge badge-danger">{result.message}</div>
        </div>
      );
    } else if (result.searchbanned && result.ghostbanned) {
      return (
        <div className="text-center text-white">
          <span>@{result.username}</span>
          <br />
          <div className="divider divider-primary">Search Results</div>
          <div className="badge badge-warning">Searchbanned</div>
          <br/>
          <div className="badge badge-warning">No reply by user can be found</div>
        </div>
      );
    } else if (result.searchbanned) {
      return (
        <div className="text-center text-white">
          <span>@{result.username}</span>
          <br />
          <div className="divider divider-primary">Search Results</div>
          <div className="badge badge-warning">Searchbanned</div>
          <br/>
          <div className="badge badge-success">At least one reply has been found</div>
        </div>
      );
    } else if (result.ghostbanned) {
      return (
        <div className="text-center text-white">
          <span>@{result.username}</span>
          <br />
          <div className="divider divider-primary">Search Results</div>
          <div className="badge badge-success">Not Searchbanned</div>
          <br/>
          <div className="badge badge-warning">No reply by user can be found</div>
        </div>
      );
    } else {
      return (
        <div className="text-center text-white">
          <span>@{result.username}</span>
          <br />
          <div className="divider divider-primary">Search Results</div>
          <div className="badge badge-success">Not Searchbanned</div>
          <br/>
          <div className="badge badge-success">At least one reply has been found</div>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto py-8 flex-grow items-center p-4">
      <h1 className="font-bold text-2xl text-slate-50">Shadowban Checker</h1>
      <div className="join items-center py-6">
        <div>
          <div>
            <input
              className="input input-bordered join-item bg-zinc-900 text-white focus:text-white focus:bg-zinc-900"
              placeholder="Enter Username"
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
                ></span>{" "}
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>
      <div className="bg-zinc-800 rounded-xl p-4">
        {results.map((result, index) => (
          <div key={index}>
            {getStatusBadge(result)}
          </div>
        ))}
      </div>
    </div>
  );
}
