import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 text-center">
      <p className="text-sm">Made with  
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="inline-block w-4 h-4 m-2">
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
        </svg> 
        by <a href="https://x.com/kirzstin" target="_blank" rel="noopener noreferrer">@kirzstin</a>
      </p>
    </footer>
  );
}
