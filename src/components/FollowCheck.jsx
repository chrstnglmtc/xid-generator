/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { followChecker } from "./functions/followChecker";
import { followFormat } from "./functions/followFormat";

export default function FollowCheck() {
  const [sourceUsername, setSourceUsername] = useState("");
  const [targetUsername, setTargetUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSourceInputChange = (event) => {
    let inputValue = event.target.value;

    // Remove '@' symbol from the beginning of the username
    if (inputValue.startsWith("@")) {
      inputValue = inputValue.substring(1);
    }

    setSourceUsername(inputValue);
  };

  const handleTargetInputChange = (event) => {
    let inputValue = event.target.value;

    // Remove '@' symbol from the beginning of the username
    if (inputValue.startsWith("@")) {
      inputValue = inputValue.substring(1);
    }

    setTargetUsername(inputValue);
  };

  const handleClick = async () => {
    setLoading(true);
    setResults([]);

    try {
      const result = await followChecker(sourceUsername, targetUsername);
      setResults([result]);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 flex-grow items-center p-4">
      <h1 className="font-bold text-2xl text-slate-50">Friendship Checker</h1>
      <div className="flex flex-col items-center space-y-2 m-5">
        <div>
          <input
            className="input input-bordered bg-zinc-900 text-white focus:text-white focus:bg-zinc-900"
            placeholder="Source"
            value={sourceUsername}
            onChange={handleSourceInputChange}
          />
        </div>
        <div>
          <input
            className="input input-bordered bg-zinc-900 text-white focus:text-white focus:bg-zinc-900"
            placeholder="Target"
            value={targetUsername}
            onChange={handleTargetInputChange}
          />
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
              "Check"
            )}
          </button>
        </div>
      </div>
      <div className="bg-zinc-800 rounded-xl p-4">
        {results.map((result, index) => (
          result.error ? (
            <p key={index} className="text-red-500">{result.error}</p>
          ) : (
            <div key={index}>
              {followFormat(sourceUsername, targetUsername, result.sourceFollowsTarget, result.targetFollowsSource)}
            </div>
          )
        ))}
      </div>
    </div>
  );
}
