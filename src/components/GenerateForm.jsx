/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { userIdGenerator } from "./functions/userIdGenerator";

export default function GenerateForm() {
  const [usernamesInput, setUsernamesInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setUsernamesInput(event.target.value);
  };

  const handleClick = async () => {
    setLoading(true);
    setResults([]);
  
    const usernames = usernamesInput
      .split(/[,\n]/)
      .map(username => username.trim())
      .filter(username => username !== ''); // Remove empty strings
  
    try {
      const userIds = await userIdGenerator(usernames);
      setResults(userIds);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div>
      <textarea
        placeholder="Enter Twitter username or usernames split by commas or new line"
        className="textarea input-bordered w-full"
        value={usernamesInput}
        onChange={handleInputChange}
      />
      <button
        className="btn btn-active btn-primary"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </>
        ) : (
          'Convert'
        )}
      </button>
      <div>
        {results.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
    </div>
  );
}
